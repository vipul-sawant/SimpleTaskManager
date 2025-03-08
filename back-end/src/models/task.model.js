import mongoose, { Schema, Types } from "mongoose";
import ApiError from "../utils/ApiError.js";

const STATUS_ENUM = ['Pending', "Completed"];

const taskSchema = new Schema({
    userID: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        index: true // ✅ Improves query performance
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        enum: STATUS_ENUM,
        required:true,
        default: "Pending"
    },
    dueDate:{
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

taskSchema.statics.isTitleAvailable = async function (userID, title) {

    const existingTask = await this.findOne({ userID, title })
        .collation({ locale: "en", strength: 2 }); // ✅ Case-insensitive check

    return existingTask;
};

taskSchema.statics.createTask = async function (title, description, dueDate, userID) {
    const formatedDate = new Date(dueDate);
    return await this.create({ title, description, dueDate:formatedDate, userID });
}

taskSchema.methods.changeTask = async function (userID, body) {
    if (this.userID.toString() !== userID.toString()) {
        throw new ApiError(403, "Unauthorized: You cannot update this task");
    }
    // Convert Mongoose document to a plain object for comparison
    const existingTask = this.toObject(); 

    // Check if there are any differences
    const isDifferent = Object.keys(body).some(key => {
        if (key === "dueDate") {
            return new Date(existingTask.dueDate).getTime() !== new Date(body.dueDate).getTime();
        }
        return existingTask[key] !== body[key];
    });
    

    if (!isDifferent) {
        throw new ApiError(400, "Nothing to update");
    }

    // If `title` is being updated, check availability
    if (body.title) {
        const titleExists = await this.constructor.isTitleAvailable(userID, body.title);
        if (titleExists) {
            throw new ApiError(400, "Task with this Title Exist");
        }
    }

    // Update only the changed fields
    Object.assign(this, body);

    return await this.save(); // Save the updated document
};

taskSchema.statics.removeTask = async function (userID, taskID) {
    // Find and delete the task while ensuring it belongs to the user
    const deletedTask = await this.findOneAndDelete({ _id: taskID, userID });

    if (!deletedTask) {
        throw new ApiError(404, "Task not found or unauthorized");
    }

    return deletedTask; // ✅ Returns the deleted document
};

const Task = mongoose.model('Task', taskSchema);

export default Task;
import mongoose, { Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: "Task"
        }
    ],
    refresh_token:{
        type: String
    }
}, {
    timestamps:true
});

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.statics.isRegistered = async function (query) {
    return await this.findOne({ 
        $or: query
    });
};

userSchema.statics.createUser = async function (user) {

    return await this.create(user);
}

userSchema.methods.checkPassword = async function(password) {
    console.log('password :', password);
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            id:this._id,
            username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
        _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generate_access_and_refresh_token = async function() {

    const accessToken = await this.generateAccessToken();
    const refreshToken = await this.generateRefreshToken();
    this.refresh_token = refreshToken;
    await this.save({validateBeforeSave:false});
    return { accessToken, refreshToken };
};

userSchema.methods.loginUser = async function () {
    const user = this.toObject(); // Convert Mongoose document to plain object

    // Remove sensitive fields
    delete user.password;
    delete user.refresh_token;

    return user;
};

userSchema.methods.addTask = async function (taskID) {

    this.tasks.push(taskID);
    await this.save({validateBeforeSave: false});
    // return true;
}

userSchema.methods.removeTask = async function (taskID) {

    this.tasks = this.tasks.filter(task=>task.toString() !== taskID.toString());
    await this.save({validateBeforeSave: false});
    // return true;
}

const User = mongoose.model('User', userSchema);

export default User;
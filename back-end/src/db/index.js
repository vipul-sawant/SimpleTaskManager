import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";

const connectDB = async () => {

    try {

        const MONGO_DB_URI = process.env.MONGO_DB_URI;
        const DB_NAME = process.env.DB_NAME || "simple_tasks_manager";

        const connectionAttemp = await mongoose.connect(`${MONGO_DB_URI}/${DB_NAME}`);
            
        console.log("✅ MongoDB Connected Successfully! 🎉"); // <-- Success message
        return connectionAttemp;
        } catch (error) {

            throw new ApiError(500, "MongoDB Connection Failed", error);;
        }
};

export default connectDB;
import asyncHandler from "../utils/asyncHandler.js";

// import mongoose from "mongoose";

import User from "../models/user.model.js";
import Task from "../models/task.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import checkID from "../utils/validateObjectId.js";

const addTask = asyncHandler(async(req, res)=>{

    const { body={}, user } = req;

    const userID = checkID(user._id, "User ID");
    console.log('userID :', userID);

    const requiredFields = ['title', 'description', 'dueDate'];
    const missingFields = requiredFields.filter(field=>!body[field]);

    try {
        
        if (missingFields.length > 0) {
            
            throw new ApiError(400, "Enter all required fields!");
        }

        console.log('missing fields :', missingFields);

        const { title, description, dueDate } = body;
        
        console.log('dueDate :', dueDate);

        const existingTask = await Task.isTitleAvailable(userID, title);

        console.log('existingTask :', existingTask);

        if (existingTask) {
            
            throw new ApiError(400, "Task with this Title Exist!");
        }

        const task = await Task.createTask(title, description, dueDate, userID);

        console.log('task :', task);

        const taskID = checkID(task._id, "Task ID");
        await user.addTask(taskID);

        return res.status(200)
        .json(new ApiResponse(201, task, "Task created Successfully!"));
    } catch (error) {

        console.log("Add Task Error Object :", error);

        if (error instanceof ApiError) {

            const {statusCode=null, message=null} = error;

            return res.status(statusCode)
            .json(new ApiResponse(statusCode, {}, message));
        }

        return res.status(500)
        .json(new ApiResponse(500, {}, "Something went Wrong with adding task!"));
    }
});

const fetchAlltasks = asyncHandler(async(req, res)=>{

    const { user } = req;
    const userID = checkID(user._id, "User ID");
    console.log('userID :', userID);

    try {

        const tasks = await User.aggregate([
            {
                $match: { _id:userID } // Ensure it's an ObjectId
            },
            {
                $lookup: {
                    from: "tasks",
                    localField: "_id", // User's _id
                    foreignField: "userID", // Tasks reference userID
                    as: "tasks",
                    pipeline: [
                        { $sort: { dueDate: 1 } } // Sort by latest updates
                    ]
                }
            },
            { $unwind: "$tasks" }, // Flatten the tasks array
            {
                $project: {
                    _id: "$tasks._id",
                    title: "$tasks.title",
                    description: "$tasks.description",
                    dueDate: "$tasks.dueDate",
                    created: "$tasks.createdAt",
                    updated: "$tasks.updatedAt",
                    status: "$tasks.status"
                }
            }
        ]);

        if (tasks.length === 0) {
            
            throw new ApiError(500, "No Tasks");
        }

        return res.status(200)
        .json(new ApiResponse(200, tasks, "Tasks fetched Successfully!"));

    } catch (error) {

        console.log("Fetch tasks Error Object :", error);

        if (error instanceof ApiError) {

            const {statusCode=null, message=null} = error;

            return res.status(statusCode)
            .json(new ApiResponse(statusCode, {}, message));
        }

        return res.status(500)
        .json(new ApiResponse(500, {}, "Something went Wrong with Fetching tasks!"));

    }
});

const updateTask = asyncHandler(async(req, res) => {

    const { params = {}, body = {}, user } = req;
    
    const userID = checkID(user._id, "User ID");
    console.log('userID :', userID);

    const  { id = null } = params;

    try {

        if (!id) {
            
            throw new ApiError(400, "task ID is missing!");
        }

        const taskID = checkID(id, "Task ID");

        if (Object.keys(body).length === 0) {
            
            throw new ApiError(400, "data to update not fetched!");
        }

        const task = await Task.findById(taskID);

        if (!task) {
            
            throw new ApiError(400, "task doest exist!");
        }

        const updatedTask = await task.changeTask(userID, body);

        return res.status(200)
        .json(new ApiResponse(204, updatedTask, "Task updated Successfully!"));
    } catch (error) {
        
        console.log("update task Error Object :", error);

        if (error instanceof ApiError) {

            const {statusCode=null, message=null} = error;

            return res.status(statusCode)
            .json(new ApiResponse(statusCode, {}, message));
        }

        return res.status(500)
        .json(new ApiResponse(500, {}, error.message || "Something went Wrong with Updating task!"));
    }
});

const deleteTask = asyncHandler(async(req, res) => {

    const { params = {}, user } = req;
    
    const userID = checkID(user._id, "User ID");
    console.log('userID :', userID);

    const  { id = null } = params;

    try {

        if (!id) {
            
            throw new ApiError(400, "task ID is missing!");
        }

        const taskID = checkID(id, "Task ID");
        
        const task = await Task.findById(taskID);

        if (!task) {
            
            throw new ApiError(400, "task doest exist!");
        }

        const deletedTask = await Task.removeTask(userID, taskID);

        await user.removeTask(deletedTask._id);

        return res.status(200)
        .json(new ApiResponse(204, deletedTask, "Task deleted Successfully!"));
    } catch(error){

        console.log("update task Error Object :", error);

        if (error instanceof ApiError) {

            const {statusCode=null, message=null} = error;

            return res.status(statusCode)
            .json(new ApiResponse(statusCode, {}, message));
        }

        return res.status(500)
        .json(new ApiResponse(500, {}, "Something went Wrong with deleting task!"));
    }
});


export { addTask, fetchAlltasks, updateTask, deleteTask };
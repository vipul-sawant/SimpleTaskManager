import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const verifyLogin = asyncHandler(async(req, res, next)=>{
    try {
        console.log('cookies :', req.cookies)
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        console.log("Access Token :", token);

        if (!token) {
            throw new ApiError(401, "Un-Authorized Request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const user = await User.findById(decodedToken?.id).select("-password -refresh_token");

        if (!user) {
            throw new ApiError(401, "Access Token Invalid or Expired");
        }

        req.user = user;
        next();

    } catch (error) {

        console.log(error);
        if (error instanceof ApiError) {

            const { statusCode=null, message=""} = error;
            return res.status(statusCode).json(
                new ApiResponse(statusCode, {}, message)
            );
        }

        return res.status(500).json(
            new ApiResponse(500, {}, error.message || "Something went wrong!")
        ); 
    }
});

export default verifyLogin;
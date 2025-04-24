import asyncHandler from "../utils/asyncHandler.js";

import User from "../models/user.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import { cookieOptions } from '../constants.js';

const convertUserData = (obj) => {

    let username = obj.username || obj.credential || null;
    let email = obj.email || obj.credential || null;

    const result = [];
    
    if (username) result.push({ username });
    if (email) result.push({ email });

    console.log('result :', result);
    return result;
};

const transformUserData = (obj) => {
    const newObj = { ...obj }; // Clone the original object

    if (newObj.c_password) {
        newObj.password = newObj.c_password; // Rename `c_password` to `password`
        delete newObj.c_password; // Remove the old `c_password` key
    }

    return newObj;
};

const registerUser = asyncHandler(async(req, res)=>{

    // const { body={} } = req;

    const requiredFields = ['username', 'email', 'c_password'];
    const missingFields = requiredFields.filter(field=>!req.body[field]);

    try {
        
        if (missingFields.length > 0) {
            
            throw new ApiError(400, "Enter all required fields!");
        }

        console.log('missing fields :', missingFields);

        const body = req.body;
        const checkQuery = convertUserData(body);
        console.log('checkQuery :', checkQuery);
        
        const existingUser = await User.isRegistered(checkQuery);

        console.log('existingUser :', existingUser);

        if (existingUser) {
            
            throw new ApiError(400, "E-mail registered with different account or Username is Unavailable!");
        }

        const createUserObj = transformUserData(body);
        console.log('createUserObj :', createUserObj);

        const createUser = await User.createUser(createUserObj);

        return res.status(200)
        .json(new ApiResponse(201, createUser, "User Registered Successfully!"));
    } catch (error) {

        console.log("Register User Error Object :", error);

        if (error instanceof ApiError) {

            const {statusCode=null, message=null} = error;

            return res.status(statusCode)
            .json(new ApiResponse(statusCode, {}, message));
        }

        return res.status(500)
        .json(new ApiResponse(500, {}, error.message || "Something went Wrong with registering User!"));
    }
});

const loginUser = asyncHandler( async (req, res) => {

    const { body={} } = req;
    
    console.log("body :", body);

    const requiredFields = ["credential", "password"];
    const missingFields = requiredFields.filter(field=>!body[field]);
    
        try {
            console.log("Missing Fields :", missingFields);

            if (missingFields.length > 0) {
                throw new ApiError(400, "Please Enter All Details");
            }

            const checkQuery = convertUserData(body);
            console.log('checkQuery :', checkQuery);

           const findUser = await User.isRegistered(checkQuery);
    
            console.log('findUser :', findUser);
    
            if (!findUser) {
                throw new ApiError(401, "Invalid Username or E-mail");
            }
            
            const userObj = transformUserData(body);
            console.log('userObj :', userObj);

            const correctPassword = await findUser.checkPassword(userObj.password);
            console.log('correctPasword :', correctPassword);

            if (!correctPassword) {

                throw new ApiError(401, "Enter Correct Password");
            }
    
            const { accessToken, refreshToken } = await findUser.generate_access_and_refresh_token();
    
            console.log("after generate : access token :", accessToken, " and refresh token :", refreshToken);

            const user = await findUser.loginUser();
    
            console.log("find user :", user);
            
            return res.status(200)
            .cookie("accessToken", accessToken, cookieOptions('login'))
            .cookie("refreshToken", refreshToken, cookieOptions('login'))
            .json(
                new ApiResponse(201, 
                    {
                        user, accessToken, refreshToken
                    },
                    `User ${user.username} logged-in successfully!`)
            );
    
        } catch (error) {
            if (error instanceof ApiError) {
                console.log(error);
                return res.status(error.statusCode)
                .json(
                    new ApiResponse(error.statusCode,{}, error.message));
            }
        }
} );

const logoutUser = asyncHandler( async (req, res) => {

    const user = req.user;
    console.log('user :', user);

    await User.findByIdAndUpdate(user._id,
        {
            $set:
                {
                    refresh_token: undefined
                }
        },
        {
            new:true
        });

    return res.status(200)
    .clearCookie('accessToken', cookieOptions('logout'))
    .clearCookie('refreshToken', cookieOptions('logout'))
    .json(new ApiResponse(201, {}, "User Logged Out"));
} );

const verifyUser = asyncHandler( async (req, res) => {

    const user = req.user;

    return res.status(200)
    .json(new ApiResponse(201, user, "User Verified !"));
} );

export { registerUser, loginUser, logoutUser, verifyUser };
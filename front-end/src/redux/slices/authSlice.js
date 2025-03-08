import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../utils/axios/create.js";

// 🔹 Initialize User (Verify Auth)
export const initializeUser = createAsyncThunk(
    "user/initializeUser",
    async (_, { rejectWithValue }) => {
        try {
            console.log('InitilazeUser');
            const { data } = await client.get("/auth/verify-login");
            return data.data; // Returns the authenticated user object
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Authentication failed");
        }
    }
);

// 🔹 Register User
export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (userDetails, { rejectWithValue }) => {
        try {
            const { data } = await client.post("/auth/register", userDetails);
            return null; // Returns user data after registration
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Registration failed");
        }
    }
);

// 🔹 Login User
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await client.post("/auth/login", credentials);
            // console.log('data :', data);
            return data.data; // Returns user data after login
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data.message || "Login failed");
        }
    }
);

// 🔹 Logout User
export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
           const { data } = await client.post("/auth/logout");
           return null; // Clears the user state on success
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Logout failed");
        }
    }
);

// 🔹 User Slice
const authSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        accessToken:null,
        refreshToken:null,
        isLoggedIn:false,
        loading: false,
        error: null
    },
    reducers: {}, // No synchronous reducers needed
    extraReducers: (builder) => {
        builder
            // ✅ Initialize User
            .addCase(initializeUser.fulfilled, (state, action) => {
                
                state.isLoggedIn = true;
                state.user = action.payload;
                state.accessToken = null;
                state.refreshToken = null;
            })

            // ✅ Register User
            .addCase(registerUser.fulfilled, (state) => {
                
                state.isLoggedIn = false;
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
            })

            // ✅ Login User
            .addCase(loginUser.fulfilled, (state, action) => {
                
                const { user = {}, accessToken = "", refreshToken = "" } = action.payload;
                
                state.isLoggedIn = true;
                state.user = user;
                state.accessToken = accessToken;
                state.refreshToken = refreshToken;
            })

            // ✅ Logout User
            .addCase(logoutUser.fulfilled, (state) => {

                state.isLoggedIn = false;
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
            })

            // ✅ Loading & Error Handling
            .addMatcher((action) => action.type.startsWith("user/") &&  action.type.endsWith("/pending"), (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher((action) => action.type.startsWith("user/") &&  action.type.endsWith("/fulfilled"), (state) => {
                state.loading = false;
            })
            .addMatcher((action) => action.type.startsWith("user/") && action.type.endsWith("/rejected"), (state, action) => {
                state.loading = false;
                // console.log(action.payload);
                state.error = action.payload;
            });
    }
});

// Export Reducer
export default authSlice.reducer;

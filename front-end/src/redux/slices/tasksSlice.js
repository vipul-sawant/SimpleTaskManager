import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../utils/axios/create.js";
import dayjs from "dayjs";

const sortTasks = (tasks) => {
    const today = dayjs().startOf("day");

    // Categorize tasks
    const pastTasks = [];
    const todayTasks = [];
    const futureTasks = [];

    tasks.forEach(task => {
        const dueDate = dayjs(task.dueDate);
        if (dueDate.isBefore(today, "day")) {
            pastTasks.push(task);
        } else if (dueDate.isSame(today, "day")) {
            todayTasks.push(task);
        } else {
            futureTasks.push(task);
        }
    });

    // Sorting Logic
    pastTasks.sort((a, b) => dayjs(a.dueDate) - dayjs(b.dueDate) || a.status.localeCompare(b.status));
    todayTasks.sort((a, b) => dayjs(a.dueDate) - dayjs(b.dueDate));
    futureTasks.sort((a, b) => dayjs(a.dueDate) - dayjs(b.dueDate));

    return [...todayTasks, ...pastTasks, ...futureTasks]; // Merging sorted tasks
};

// 🔹 fetch all tasks 
export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async (_, { rejectWithValue }) => {
        try {
            console.log('fetchTasks');
            const { data } = await client.get("/tasks");
            return data.data; // Returns the authenticated user object
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Fetching tasks failed");
        }
    }
);

// 🔹 Register User
export const addTask = createAsyncThunk(
    "tasks/addTask",
    async (taskData, { rejectWithValue }) => {
        try {
            console.log('addTask');
            const { data } = await client.post("/tasks", taskData);
            console.log("data after add :", data);
            return data.data; // Returns note data after adding
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Adding task failed");
        }
    }
);

// 🔹 Login User
export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async ({ taskData, taskID }, { rejectWithValue }) => {
        try {
            console.log("Updating task...");
            const { data } = await client.patch(`/tasks/${taskID}`, taskData);
            return data.data; // ✅ Returns updated note data
        } catch (error) {
            console.error("Update Error:", error);
            return rejectWithValue(error.response?.data?.message || "Updating task failed");
        }
    }
);


// 🔹 Logout User
export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (taskID, { rejectWithValue }) => {
        try {
            console.log('deleteTask');
            const { data } = await client.delete(`/tasks/${taskID}`);
            return data.data; // Clears the user state on success
        } catch (error) {
            return rejectWithValue(error.response?.data.message || "Deleing task failed");
        }
    }
);

// 🔹 User Slice
const noteSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        loading: false,
        error: null
    },
    reducers: {

        // reArrange:(state, action) => {

        //     state.tasks = state.tasks.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        // }
    }, // No synchronous reducers needed
    extraReducers: (builder) => {
        builder
            // ✅ Initialize User
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = sortTasks(action.payload);
            })

            // ✅ Register User
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.unshift(action.payload);
            })

            // ✅ Login User
            .addCase(updateTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.map(note => note._id === action.payload._id ? action.payload : note);
            })

            // ✅ Logout User
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(note => note._id !== action.payload._id);
            })

            // ✅ Loading & Error Handling
            .addMatcher((action) => action.type.startsWith("tasks/") &&  action.type.endsWith("/pending"), (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher((action) => action.type.startsWith("tasks/") &&  action.type.endsWith("/fulfilled"), (state) => {
                state.loading = false;
            })
            .addMatcher((action) => action.type.startsWith("tasks/") &&  action.type.endsWith("/rejected"), (state, action) => {
                state.loading = false;
                console.log(action.payload);
                state.error = action.payload;
            });
    }
});

// export const { reArrange } = noteSlice.actions;
// Export Reducer
export default noteSlice.reducer;

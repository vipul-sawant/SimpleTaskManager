import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "./slices/authSlice.js";
import taskReducer from "./slices/tasksSlice.js";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["auth", "tasks"]
};

const rootReducer = combineReducers({
    auth: authReducer,
    tasks: taskReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };

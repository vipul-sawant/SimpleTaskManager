import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { initializeUser } from "./redux/slices/authSlice.js";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.js";

import "./index.css";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { fetchTasks } from './redux/slices/tasksSlice.js';

const initializeApp = async () => {
    const root = createRoot(document.getElementById("root"));
    root.render(<div class="d-flex flex-column align-items-center justify-content-center vh-100">
        <div class="spinner-border text-light" style={{width: "4rem", height: "4rem"}} role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 loading-text" style={{fontWeight: "900", fontSize: "4rem", color:"white"}}>Loading, please wait...</p>
    </div>);

    // ✅ Ensure Redux Persist is ready before initialization
    await new Promise((resolve) => {
        const unsubscribe = persistor.subscribe(() => {
            resolve();
            unsubscribe();
        });
    });

    // ✅ Initialize user first
    const userAction = await store.dispatch(initializeUser());

    const actionErrors = Object.keys(userAction?.error || {});
    console.log(actionErrors);

    // ✅ If user exists, fetch notes
    if (actionErrors.length === 0) {
        await store.dispatch(fetchTasks());
    }

    root.render(
        <StrictMode>
            <Provider store={store}>
                <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </StrictMode>
    );
};

initializeApp();

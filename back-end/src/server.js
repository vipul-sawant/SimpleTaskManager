import { config } from "dotenv";
const envData = config();

const mode = process.env.NODE_ENV || "development";

console.log("Mode is ", mode);
if (mode === "development") {
    console.log('server envData :',envData);
}

import initApp from "./app.js";
import connectToDB  from "./db/index.js";
import ApiError from "./utils/ApiError.js";

const port = process.env.PORT || 4000;
const startServer = async () => {
    try {
        if (process.env.NODE_ENV !== "test") {
            await connectToDB();
        }
        const app = initApp();
        app.listen(port, () => {
            console.log(`✅ Server running on port ${port}`);
        });
    } catch (error) {
        if (error instanceof ApiError) {
            console.error("❌ Database Error:", error.message);
        } else {
            console.error("❌ Unexpected Error:", error);
        }
        process.exit(1); // Exit if DB connection fails
    }
};

startServer();
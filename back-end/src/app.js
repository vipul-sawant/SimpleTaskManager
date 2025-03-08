import { config } from "dotenv";
const envData = config();

const mode = process.env.NODE_ENV;
console.log("Current Mode:", mode);

if (mode === "development") {
    
    console.log('server envData :',envData);
}

import e, { json, urlencoded, static as static_ } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = e();

const corsOptions = {
    credentials:true,
    origin: process.env.CORS_ORIGIN
};

console.log('corsOptions :', corsOptions);

const jsonOptions = {
    limit: "16kb"
};

const urlEncodedOptions = {
    extended: true,
    limit: "16kb"
};

app.use(cors(corsOptions));

app.use(json(jsonOptions));
app.use(urlencoded(urlEncodedOptions));
app.use(static_('public'));

app.use(cookieParser());

app.use((req, _, next) => {
    const fullURL = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    console.log(`🛠 Request received: ${fullURL}`);
    next();
});

import AuthRoutes from "./routes/auth.routes.js";
import TaskRoutes from "./routes/task.routes.js";

app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/tasks', TaskRoutes);

export default app;
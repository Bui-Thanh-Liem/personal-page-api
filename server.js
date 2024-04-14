import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB, disconnectDB } from "./config/database.js";
import { errorHandlingMiddleware } from "./middleware/errorHandlingMiddleWare.js";
import { APIS_V1 } from "./routes/index.js";

const startServer = () => {
    const app = express();
    const localhost = process.env.LOCALHOST_DEV || "localhost";
    const port = process.env.PORT_DEV || 3001;

    // Cors
    app.use(cors());

    // Cookie
    app.use(cookieParser());

    // Req.body
    app.use(express.json());

    // Route
    app.use("/v1", APIS_V1);

    // Middleware
    app.use(errorHandlingMiddleware);

    if (process.env.PORT) {
        app.listen(process.env.PORT, () => {
            console.log(`Server listening on ${process.env.PORT}`);
        });
    } else {
        app.listen(port, localhost, () => {
            console.log(`Server listening on http://${localhost}:${port}`);
        });
    }

    process.on("SIGINT", () => {
        database.disconnectDB();
    });
};

(async () => {
    try {
        await connectDB();
        startServer();
    } catch (error) {
        await disconnectDB();
    }
})();

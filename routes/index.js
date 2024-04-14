import express from "express";
import { commentRouter } from "./commentRoute.js";
import { blogRouter } from './blogRoute.js';
import { userRouter } from "./userRoute.js";

const router = express.Router();

router.use("/comments", commentRouter);
router.use("/blogs", blogRouter);
router.use("/auth", userRouter);

export const APIS_V1 = router;

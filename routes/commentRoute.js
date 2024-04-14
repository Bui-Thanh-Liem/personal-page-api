import express from "express";
import { commentController } from "../controller/commentsController.js";

const router = express.Router();

router
    .route("/")
    .post(commentController.createComment)
    .get(commentController.getAllComments);

router.route("/:id").get(commentController.getCommentsByBlogId);

export const commentRouter = router;

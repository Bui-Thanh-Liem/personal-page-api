import { commentService } from "../service/commentService.js";

const createComment = async (req, res, next) => {
    try {
        const newComment = await commentService.createComment(req.body);
        res.status(200).json(newComment);
    } catch (error) {
        next(error);
    }
};

const getAllComments = async (req, res, next) => {
    try {
        const comments = await commentService.getAllComments();
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

const getCommentsByBlogId = async (req, res, next) => {
    try {
        const comments = await commentService.getCommentsByBlogId(
            req.params.id
        );
        res.status(200).json(comments);
    } catch (error) {
        throw new Error(error);
    }
};

export const commentController = {
    createComment,
    getAllComments,
    getCommentsByBlogId,
};

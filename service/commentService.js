import Comment from "../model/Comment.js";
import Blog from "../model/Blog.js";

const createComment = async (dataNewComment) => {
    try {
        const comment = new Comment({
            blogId: dataNewComment.blogId,
            name: dataNewComment.name,
            content: dataNewComment.content,
        });
        const newComment = await comment.save();

        await Blog.findOneAndUpdate(
            { _id: dataNewComment.blogId },
            { $inc: { quantityComments: 1 } },
            { returnDocument: "after" }
        );

        return newComment;
    } catch (error) {
        throw new Error(error);
    }
};

const getAllComments = async () => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        const commentsFormattedDate = comments.map((comment) => {
            const date = new Date(comment._doc.createdAt);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return { ...comment._doc, ago: `${month}-${day}-${year}` };
        });
        return commentsFormattedDate;
    } catch (error) {
        throw new Error(error);
    }
};

const getCommentsByBlogId = async (id) => {
    try {
        const comments = await Comment.find({ blogId: id });
        const commentsFormattedDate = comments.map((comment) => {
            const date = new Date(comment._doc.createdAt);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return { ...comment._doc, ago: `${month}-${day}-${year}` };
        });
        return commentsFormattedDate;
    } catch (error) {
        throw new Error(error);
    }
};

export const commentService = {
    createComment,
    getAllComments,
    getCommentsByBlogId,
};

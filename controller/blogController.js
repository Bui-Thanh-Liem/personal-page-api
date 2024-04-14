import { blogService } from "../service/blogService.js";

const createBlog = async (req, res, next) => {
    try {
        const newBlog = await blogService.createBlog(req.body);
        res.status(200).json(newBlog);
    } catch (error) {
        next(error);
    }
};

const getTenBlogs = async (req, res, next) => {
    try {
        const tenBlogs = await blogService.getTenBlogs();
        res.status(200).json(tenBlogs);
    } catch (error) {
        next(error);
    }
};

const getBlogsByKyeWord = async (req, res, next) => {
    try {
        const blogs = await blogService.getBlogsByKyeWord(req.query.keyWord);
        res.status(200).json(blogs);
    } catch (error) {
        next(error);
    }
};

const fefreshIdBlogsReceived = (req, res) => {
    blogService.fefreshIdBlogsReceived();
    res.status(200).json("Refresh idBlogsReceived successfully !");
};

export const blogController = {
    createBlog,
    getTenBlogs,
    getBlogsByKyeWord,
    fefreshIdBlogsReceived,
};

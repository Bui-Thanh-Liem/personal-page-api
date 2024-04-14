import Blog from "../model/Blog.js";

const createBlog = async (dataNewBlog) => {
    try {
        const blog = new Blog(dataNewBlog);
        const newBlog = await blog.save();
        return newBlog;
    } catch (error) {
        throw new Error(error);
    }
};

let idBlogsReceived = [];
const fefreshIdBlogsReceived = () => {
    idBlogsReceived = [];
}

const getTenBlogs = async () => {
    try {
        const tenBlogs = await Blog.find({
            _id: { $nin: idBlogsReceived },
        }).limit(5);

        const blogIds = tenBlogs.map((b) => b._id);
        idBlogsReceived.push(...blogIds);

        return tenBlogs;
    } catch (error) {
        throw new Error(error);
    }
};

const getBlogsByKyeWord = async (keyWord) => {
    try {
        const blogs = await Blog.find({
            $or: [
                { title: { $regex: keyWord, $options: "i" } },
                { desc: { $regex: keyWord, $options: "i" } },
            ],
        });
        return blogs;
    } catch (error) {
        throw new Error(error);
    }
};

export const blogService = {
    createBlog,
    getTenBlogs,
    getBlogsByKyeWord,
    fefreshIdBlogsReceived
};

import { Router } from "express";
import { blogController } from "../controller/blogController.js";

const router = Router();

router
    .route("/")
    .get(blogController.getTenBlogs)
    .post(blogController.createBlog);

router.route("/search").get(blogController.getBlogsByKyeWord);
router.route("/refresh").get(blogController.fefreshIdBlogsReceived);

export const blogRouter = router;

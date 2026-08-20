import express from "express"
import { createBlog, createBlogWithAI, getAllBlogs, getSingleBlog } from "../controllers/blog.controller.js"
import log from "../middlewares/blog.middleware.js"

const router = express.Router()

router.post("/blogs", log, createBlog)
router.post("/blogs/ai", log, createBlogWithAI)
router.get("/blogs", log, getAllBlogs)
router.get("/blogs/:id", log, getSingleBlog)

export default router
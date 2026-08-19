import express from "express"
import { createBlog, getAllBlogs, getSingleBlog } from "../controllers/blog.controller.js"

const router = express.Router()

router.post("/blogs", createBlog)
router.get("/blogs", getAllBlogs)
router.get("/blogs/:id", getSingleBlog)

export default router
import Blog from "../models/blog.model.js"


export const createBlog = async (req, res) => {
    try {
         const { title, description, author } = req.body


        if (!title || !description || !author) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            })
        }
        const newBlog = await Blog.create({
            title,
            description,
            author,
        })

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: newBlog,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
       
        
    }
}


export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
        res.status(200).json({
            success: true,
            message: "Blogs get successfully",
            data: blogs,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Failed to get blogs",
            error: error.message,
        })
        
    }
}

export const getSingleBlog = async (req, res) => {
    try {
        const info = req.params.id
        const blog = await Blog.findById(info)

        if(!blog){
            return res.status(404).json({
                succcess: false,
                message: "Blog not found",
                data: null,
            })
        }
        res.status(200).json({
            success: true,
            message: "blog is here",
            data: blog,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error while getting a blog",
            error: error.message,
        })
        
    }
}
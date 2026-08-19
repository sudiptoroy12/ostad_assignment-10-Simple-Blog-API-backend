import mongoose  from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title for this blog"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description for this blog"],
    },
    aurhor: {
        type: String,
        required: [true, "Please provide a author for this blog"],
    }
},{timestamps: true})


const Blog = mongoose.model("Blog", blogSchema)

export default Blog
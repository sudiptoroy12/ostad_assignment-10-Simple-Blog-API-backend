import Blog from "../models/blog.model.js";

export const createBlog = async (req, res) => {
  try {
    const { title, description, author } = req.body;

    if (!title || !description || !author) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const newBlog = await Blog.create({
      title,
      description,
      author,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const createBlogWithAI = async (req, res) => {
  const { title, author } = req.body;

  const prompt = `Write a blog post description with the title ${title}. The blog post should be informative, engaging, and well-structured. Please provide a detailed description of the topic. The blog post should be in 100 words long.Only provide the blog post description no title, no headings, no bullets .`;

  try {
    const response = await fetch(process.env.GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await response.json();
    
    console.log(data?.choices?.[0]?.message?.content?.trim());
    const results =
      data?.choices?.[0]?.message?.content?.trim() || "No response generated.";

    const newBlog = await Blog.create({
      title,
      description: results,
      author,
    });
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      success: true,
      message: "Blogs get successfully",
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get blogs",
      error: error.message,
    });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const info = req.params.id;
    const blog = await Blog.findById(info);

    if (!blog) {
      return res.status(404).json({
        succcess: false,
        message: "Blog not found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "blog is here",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error while getting a blog",
      error: error.message,
    });
  }
};

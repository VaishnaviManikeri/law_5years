const Blog = require("../models/Blog");

/* PUBLIC */

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find({ published: true }).sort("-createdAt");
  res.json(blogs);
};

exports.getBlogById = async (req, res) => {
  res.json(await Blog.findById(req.params.id));
};

/* ADMIN */

exports.getBlogsAdmin = async (req, res) => {
  res.json(await Blog.find().sort("-createdAt"));
};

exports.createBlog = async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
};

exports.updateBlog = async (req, res) => {
  res.json(
    await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
  );
};

exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

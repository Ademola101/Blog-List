const blogRouter = require('express').Router();

const Blog = require('../models/Blog');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
  const newBlog = new Blog(req.body);
  const savedBlog = await newBlog.save();
  res.status(201).json(savedBlog);
});

module.exports = blogRouter;

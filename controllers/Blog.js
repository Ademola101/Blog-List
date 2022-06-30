const blogRouter = require('express').Router();

const Blog = require('../models/Blog');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
  const {
    title, author, url, likes,
  } = req.body;
  const newBlog = new Blog({
    title,
    author,
    url,
    likes: likes === undefined ? 0 : likes,
  });
  const savedBlog = await newBlog.save();
  res.status(201).json(savedBlog);
});

module.exports = blogRouter;

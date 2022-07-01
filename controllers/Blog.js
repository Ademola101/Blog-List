const blogRouter = require('express').Router();

const Blog = require('../models/Blog');

blogRouter.put('/:id', async (req, res, next) => {
  try {
    const { title, likes, url } = req.body;
    const updateBlog = {
      title,
      likes,
      url,
    };
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateBlog);
    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.post('/', async (req, res, next) => {
  const {
    title, author, url, likes,
  } = req.body;
  const newBlog = new Blog({
    title,
    author,
    url,
    likes: likes === undefined ? 0 : likes,
  });
  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;

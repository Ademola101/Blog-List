const blogRouter = require('express').Router();
const User = require('../models/User');

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

blogRouter.post('/', async (req, res) => {
  const {
    title, author, url, likes, userId,
  } = req.body;
  const user = await User.findById(userId);
  
  const newBlog = new Blog({
    title,
    author,
    url,
    likes: likes === undefined ? 0 : likes,
    user: user._id,
  });

  const savedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog);
});

module.exports = blogRouter;

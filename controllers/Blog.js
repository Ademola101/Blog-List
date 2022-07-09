const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
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
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateBlog, { new: true });
    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', async (req, res, next) => {
  const { token } = req;

  const decodenToken = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(decodenToken.id);
  if (!(token && decodenToken.id)) {
    res.status(401).json({ error: 'token missing or invalid' });
  }
  const blog = await Blog.findById(req.params.id);
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } else {
    res.status(401).json({ error: 'unathorize' });
  }
});

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, id: 1 });
  res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
  const { token } = req;
  const decodenToken = jwt.verify(token, process.env.SECRET);
  if (!decodenToken.id) {
    res.status(401).json({ error: 'token missing or invalid' });
  }
  const {
    title, author, url, likes,
  } = req.body;
  const user = await User.findById(decodenToken.id);

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

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

module.exports = blogRouter;

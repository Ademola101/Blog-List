const blogRouter = require('express').Router();
const Blog = require('../models/Blog');

blogRouter.get('/', (req, res) => {
  Blog.find({}).then((blogs) => res.json(blogs));
});

blogRouter.post('/', (req, res, next) => {
  const newBlog = new Blog(req.body);
  newBlog.save().then((savedBlog) => res.json(savedBlog)).catch((error) => {
    next(error);
  });
});

module.exports = blogRouter;

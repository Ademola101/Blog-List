const userRouter = require('express').Router();
const User = require('../models/User');

userRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

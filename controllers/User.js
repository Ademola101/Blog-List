const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

userRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;
  if (password.length < 3) {
    res.status(401).json({ error: 'password must be atleast 3 character' });
  }
  const saltround = 10;
  const passwordHash = await bcrypt.hash(password, saltround);
  const newUser = new User({
    username,
    name,
    passwordHash,
  });

  const saveUser = await newUser.save();
  res.status(201).json(saveUser);
});

module.exports = userRouter;

const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const User = require('../models/User');

const { userInDb, oneUser } = require('./user_helper');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('ademola', 10);
  await new User({
    username: 'ademola',
    name: 'ogunmokun',
    passwordHash,
  })
    .save();
});

describe('when user is created', () => {
  test('a valid user is added and return sucess code', async () => {
    const newUser = {
      username: 'newuser',
      password: 'ademola',
      name: 'newUser',
    };

    await api.post('/api/users').send(newUser).expect(201);
  }, 100000);
});

afterAll(() => {
  mongoose.connection.close();
});

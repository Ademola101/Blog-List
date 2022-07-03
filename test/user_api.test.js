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
}, 100000);

describe('when there is initially a user in the db', () => {
  test('there is one user in the db', async () => {
    const db = await userInDb();
    expect(db).toHaveLength(1);
    expect(db.map((d) => d.username)).toContain('ademola');
  }, 100000);
  test('a valid user is added and return sucess code', async () => {
    const newUser = {
      username: 'newuser',
      password: 'ademola',
      name: 'newUser',
    };

    await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/);
  }, 100000);

  test('an user with no username attempt creation', async () => {
    const noUsername = {
      name: 'nousername',
      password: '123456',
    };

    await api.post('/api/users').send(noUsername).expect(400);
  });

  test('password with length less than 3 is a bad request', async () => {
    const badPassword = {
      name: 'badpassword',
      username: 'badpassword',
      password: '12',
    };
    const userAtStart = await userInDb();

    await api.post('/api/users').send(badPassword).expect(400);
    const userAtEnd = await userInDb();
    expect(userAtStart).toHaveLength(userAtEnd.length);
  }, 100000);
});

afterAll(() => {
  mongoose.connection.close();
});

const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');

const api = supertest(app);
const { manyBlog, oneBlog } = require('./blog_post');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(manyBlog);
});

test('return all blog in json', async () => {
  await api.get('/api/blog').expect(200).expect('Content-Type', /application\/json/);
  const response = await api.get('/api/blog');
  expect(response.body).toHaveLength(manyBlog.length);
}, 100000);

test('a unique identifier id exist', async () => {
  const response = await api.get('/api/blog');
  const ids = response.body.map((blog) => blog.id);
  // eslint-disable-next-line no-restricted-syntax
  for (const id of ids) {
    expect(id).toBeDefined();
  }
}, 100000);

test('a new blog created successfully', async () => {
  await api.post('/api/blog').send(oneBlog).expect(201).expect('Content-Type', /application\/json/);
}, 100000);

afterAll(() => {
  mongoose.connection.close();
});

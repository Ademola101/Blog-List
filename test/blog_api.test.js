const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');

const api = supertest(app);
const { manyBlog, oneBlogObj } = require('./blog_post');

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
  await api.post('/api/blog').send(oneBlogObj).expect(201).expect('Content-Type', /application\/json/);
  const blogs = await api.get('/api/blog');
  expect(blogs.body).toHaveLength(manyBlog.length + 1);
}, 100000);

test('no likes property return 0', async () => {
  const blogNoLikes = {
    title: 'blog no likes',
    author: 'ademola',
    url: 'ghgh',
  };
  await api.post('/api/blog')
    .send(blogNoLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogs = await Blog.find({});

  expect(blogs.at(-1).likes).toBe(0);
}, 100000);

test('blog with no title and url return 400 Bad request', async () => {
  const noTitle = {
    author: 'ademola',
    likes: 3,
  };
  await api.post('/api/blog').send(noTitle).expect(400);
}, 100000);

afterAll(() => {
  mongoose.connection.close();
});

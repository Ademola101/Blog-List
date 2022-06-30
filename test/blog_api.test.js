const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');

const api = supertest(app);
const { manyBlog } = require('./blog_post');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(manyBlog);
});

test('return all blog in json', async () => {
  await api.get('/api/blog').expect(200).expect('Content-Type', /application\/json/);
});

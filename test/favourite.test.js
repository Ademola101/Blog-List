const { favouriteBlog } = require('../utils/list_helper');
const { oneBlog, zeroBlog, manyBlog } = require('./blog_post');

describe('favourite blog', () => {
  test('should return the likes of a single blog', () => {
    const result = favouriteBlog(oneBlog);
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });

  test('should return the object with most likes in the list of objects', () => {
    const result = favouriteBlog(manyBlog);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });

  test('should return null for empty list', () => {
    const result = favouriteBlog(zeroBlog);
    expect(result).toBe(null);
  });
});

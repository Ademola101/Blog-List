const { totalLikes } = require('../utils/list_helper');
const { oneBlog, zeroBlog, manyBlog } = require('./blog_post');

describe('total likes', () => {
  test('when the list has only one blog, total likes equals to that', () => {
    const result = totalLikes(oneBlog);
    expect(result).toBe(5);
  });

  test('should return 0 for list with no blog', () => {
    const result = totalLikes(zeroBlog);
    expect(result).toBe(0);
  });

  test('should return the sum of likes for list with many blogs', () => {
    const result = totalLikes(manyBlog);
    expect(result).toBe(36);
  });
});

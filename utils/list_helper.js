const dummy = () => 1;

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  const reducer = (sum, value) => sum + value;
  return blogs.map((blog) => blog.likes).reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  const mostLiked = blogs.reduce((prev, curr) => (prev.likes > curr.likes ? prev : curr));
  const { title, author, likes } = mostLiked;
  return {
    title,
    author,
    likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,

};

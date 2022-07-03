const bcrypt = require('bcrypt');
const User = require('../models/User');

const userInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  userInDb,

};

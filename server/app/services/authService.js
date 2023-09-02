const db = require("../models/index");

exports.signup = async (userData) => {
  return await db.User.create(userData);
};

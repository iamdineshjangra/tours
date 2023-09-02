const db = require("../models/index");
const jwt = require("jsonwebtoken");

exports.signup = async (userData) => {
  return await db.User.create(userData);
};

exports.createJwtToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

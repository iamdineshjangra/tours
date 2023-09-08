const db = require("../models/index");
const jwt = require("jsonwebtoken");
const util = require('util');

exports.signup = async (userData) => {
  return await db.User.create(userData);
};

exports.createJwtToken = async (userId) => {
  return await util.promisify(jwt.sign)({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.verifyToken = async (token, secret) => {
  return await util.promisify(jwt.verify)(token, secret);
}

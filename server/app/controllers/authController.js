const bycrpt = require('bcrypt');
const crypto = require('crypto');
const db = require("../models/index");
const authService = require("../services/authService");
const userService = require("../services/userService");
const responseUtils = require("../utils/sendResponse");
const utils = require('../utils/sendMail');

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, role, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return responseUtils.sendErrorResponse(
        400,
        "Please enter all required field",
        res
      );
    }
    if (role) {
      return responseUtils.sendErrorResponse(
        400,
        "This api is not to add role. Please do a hit to other api to achieve this.",
        res
      );
    }
    const user = await authService.signup(req.body);
    const token = authService.createJwtToken(user.id);
    return res.status(201).json({
      status: "success",
      user: user,
      token: token,
    });
  } catch (err) {
    console.log(err);
    let modelError = false;
    if (err && err.name === "SequelizeUniqueConstraintError") {
      modelError = true;
    }
    return responseUtils.sendErrorResponse(
      500,
      "Error while creating user",
      res,
      modelError
    );
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return responseUtils.sendErrorResponse(
        400,
        "Please enter required fields",
        res
      );
    }
    const user = await userService.getUser(email);
    if (!user) {
      return responseUtils.sendErrorResponse(404, "User not found", res);
    }
    const isCorrectPassword = await user.validatePassword(password);
    if (!isCorrectPassword) {
      return responseUtils.sendErrorResponse(401, "Incorrect password", res);
    }
    const token = authService.createJwtToken(user.id);
    return res.status(200).json({
      status: "success",
      user: user,
      token: token,
    });
  } catch (err) {
    console.log(err);
    return responseUtils.sendErrorResponse(
      500,
      "Error while login the user",
      res
    );
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const email = req.body.email;

    if (!email) {
      responseUtils.sendErrorResponse(
        400,
        "Please enter a email to change password",
        res
      );
    }

    const user = await userService.getUser(email);

    if(!user) {
      responseUtils.sendErrorResponse(404, 'No user exists with provided email');
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashToken = await bycrpt.hash(resetToken, 10);
    user.resetToken = hashToken;
    user.resetTokenValidTime = Date.now() + 10 * 60 * 1000 + 10000;
    await user.save();
    await utils.sendMail(user.email, user.resetToken);
    res.status(200).json({
      status: 'success',
    })
  } catch (err) {
    responseUtils.sendErrorResponse(
      500,
      "Error while changing user password",
      res
    );
  }
};

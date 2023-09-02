const db = require("../models/index");
const authService = require("../services/authService");
const userService = require("../services/userService");
const responseUtils = require("../utils/sendResponse");
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
    return responseUtils.sendErrorResponse(
      500,
      "Error while creating user",
      res
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
    res.status(500).send({
      status: "fail",
      errMessage: "Error while login the user",
    });
  }
};

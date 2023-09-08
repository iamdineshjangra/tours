const bycrpt = require("bcrypt");
const crypto = require("crypto");
const db = require("../models/index");
const authService = require("../services/authService");
const userService = require("../services/userService");
const responseUtils = require("../utils/sendResponse");
const sendMailUtils = require("../utils/sendMail");

exports.signup = async (req, res) => {
  try {
    const user = await authService.signup(req.body);
    const token = authService.createJwtToken(user.id);
    return res.status(201).json({
      status: "success",
      user: user,
      token: token,
    });
  } catch (err) {
    console.log(err);
    if (err && err.name === "SequelizeUniqueConstraintError") {
      return responseUtils.sendErrorResponse(
        500,
        "This email is not available",
        res
      );
    }
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
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return responseUtils.sendErrorResponse(
        401,
        "Either email or password is incorrect",
        res
      );
    }
    const isCorrectPassword = await user.validatePassword(password);
    if (!isCorrectPassword) {
      return responseUtils.sendErrorResponse(
        401,
        "Either email or password is incorrect",
        res
      );
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
    const user = await userService.getUserByEmail(email);

    if (!user) {
      return responseUtils.sendErrorResponse(
        404,
        "No user exists with provided email",
        res
      );
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashToken = await bycrpt.hash(resetToken, 10);
    user.resetToken = hashToken;
    user.resetTokenValidTime = Date.now() + 10 * 60 * 1000 + 10000;
    await user.save();
    await sendMailUtils.sendMail(user.email, user.id, user.resetToken);
    return res.status(200).json({
      status: "success",
      message: "Please check your gmail to change password.",
    });
  } catch (err) {
    return responseUtils.sendErrorResponse(
      500,
      "Error while changing user password",
      res
    );
  }
};

exports.resetPassword = async (req, res) => {
  try {
    let { resetToken, userId } = req.query;
    const { password } = req.body;

    userId = parseInt(userId);
    const user = await userService.getUserById(userId);

    if (!user) {
      return responseUtils.sendErrorResponse(404, "User not found", res);
    }

    const isValidResetToken = resetToken === user.resetToken;

    if (!isValidResetToken) {
      return responseUtils.sendErrorResponse(400, "Invalid reset token.", res);
    }

    const isTimeRemainingToChangePassword =
      user.resetTokenValidTime > Date.now();

    if (!isTimeRemainingToChangePassword) {
      return responseUtils.sendErrorResponse(
        400,
        "Reset token has been expired",
        res
      );
    }
    user.resetToken = null;
    user.resetTokenValidTime = null;
    user.password = password;
    await user.save();
    return res.status(200).json({
      status: "success",
      message: "Password is updated successfully",
    });
  } catch (err) {
    console.log(err);
    return responseUtils.sendErrorResponse(
      500,
      "Error while reseting password",
      res
    );
  }
};

exports.protector = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers &&
      req.headers["authorization"] &&
      req.headers["authorization"].startsWith("Bearer")
    ) {

      token = req.headers["authorization"].split(" ")[1];
      if(!token) {
        return responseUtils.sendErrorResponse(
          401,
          "Token is not present in req",
          res
        );
      }
      
      const decrypted = await authService.verifyToken(token, process.env.JWT_SECRET_KEY);
      const user = await userService.getUserById(decrypted.id);

      // if user get deleted after token issued

      if(!user) {
        return responseUtils.sendErrorResponse(401, "Invaild token", res)
      }

      next();
    } else {
      return responseUtils.sendErrorResponse(
        401,
        "Token is not present in req",
        res
      );
    }
  } catch (err) {
    console.log(err);
    return responseUtils.sendErrorResponse(
      500,
      "Something went wrong while verifying token.",
      res
    );
  }
};

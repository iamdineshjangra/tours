const validator = require("email-validator");
const responseUtils = require("../utils/sendResponse");

const passwordRegExp =
  "^(?=.*[0-9])" +
  "(?=.*[a-z])(?=.*[A-Z])" +
  "(?=.*[@#$%^&+=])" +
  "(?=\\S+$).{8,20}$";

exports.resetPasswordFormValidation = async (req, res, next) => {
  try {
    let { resetToken, userId } = req.query;
    const { password } = req.body;

    if (!resetToken || !userId) {
      return responseUtils.sendErrorResponse(
        400,
        "Reset token and user id both should present in req",
        res
      );
    }

    if (!password) {
      return responseUtils.sendErrorResponse(
        400,
        "Please enter the password to change the password",
        res
      );
    }

    if (/\s/.test(resetToken)) {
      return responseUtils.sendErrorResponse(
        400,
        "White space is not allowed with reset token",
        res
      );
    }

    if (/\s/.test(password)) {
      return responseUtils.sendErrorResponse(
        400,
        "White space is not allowed with user id",
        res
      );
    }

    if (/\s/.test(userId)) {
      return responseUtils.sendErrorResponse(
        400,
        "White space is not allowed in password input field",
        res
      );
    }

    if (!password.match(passwordRegExp)) {
      return responseUtils.sendErrorResponse(
        400,
        "Password should have minimum 8 characters and can have maximum 20 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number",
        res
      );
    }

    next();
  } catch (err) {
    console.log(err);
    return responseUtils.sendErrorResponse(
      500,
      "Error while reseting the password",
      res
    );
  }
};

const validator = require("email-validator");
const responseUtils = require("../utils/sendResponse");

const passwordRegExp =
  "^(?=.*[0-9])" +
  "(?=.*[a-z])(?=.*[A-Z])" +
  "(?=.*[@#$%^&+=])" +
  "(?=\\S+$).{8,20}$";

exports.loginFormValidation = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return responseUtils.sendErrorResponse(
        400,
        "Please enter required fields",
        res
      );
    }

    if (/\s/.test(email)) {
      return responseUtils.sendErrorResponse(
        400,
        "White space is not allowed in email input field",
        res
      );
    }

    if (/\s/.test(password)) {
      return responseUtils.sendErrorResponse(
        400,
        "White space is not allowed in password input field",
        res
      );
    }

    if (!validator.validate(email)) {
      return responseUtils.sendErrorResponse(
        400,
        "Email should be type email",
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
      "Error while login the user",
      res
    );
  }
};

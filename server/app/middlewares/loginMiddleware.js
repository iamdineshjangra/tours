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
        "Please enter all required fields",
        res
      );
    }

    if (/\s/.test(email)) {
      return responseUtils.sendErrorResponse(
        401,
        "Either email or password is invalid",
        res
      );
    }

    if (/\s/.test(password)) {
      return responseUtils.sendErrorResponse(
        401,
        "Either email or password is invalid",
        res
      );
    }

    if (!validator.validate(email)) {
      return responseUtils.sendErrorResponse(
        401,
        "Either email or password is invalid",
        res
      );
    }

    if (!password.match(passwordRegExp)) {
      return responseUtils.sendErrorResponse(
        401,
        "Either email or password is invalid",
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

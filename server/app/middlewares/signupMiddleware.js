const validator = require("email-validator");
const responseUtils = require("../utils/sendResponse");

const passwordRegExp =
  "^(?=.*[0-9])" +
  "(?=.*[a-z])(?=.*[A-Z])" +
  "(?=.*[@#$%^&+=])" +
  "(?=\\S+$).{8,20}$";

exports.signupFormValidation = async (req, res, next) => {
  try {
    const { firstName, lastName, role, email, password, confirmPassword } =
      req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return responseUtils.sendErrorResponse(
        400,
        "Please enter all required fields",
        res
      );
    }

    if (/\s/.test(firstName)) {
      return responseUtils.sendErrorResponse(
        400,
        "White space is not allowed in first name input field",
        res
      );
    }

    if (/\s/.test(lastName)) {
      return responseUtils.sendErrorResponse(
        400,
        "White space is not allowed in last name input field",
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

    if (/\s/.test(confirmPassword)) {
      return responseUtils.sendErrorResponse(
        400,
        "White space is not allowed in confirm password input field",
        res
      );
    }

    if (!validator.validate(email)) {
      return responseUtils.sendErrorResponse(
        400,
        "Email should be of type email",
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

    if (!confirmPassword.match(passwordRegExp)) {
      return responseUtils.sendErrorResponse(
        400,
        "Confirm password should have minimum 8 characters and can have maximum 20 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number",
        res
      );
    }

    if (password !== confirmPassword) {
      return responseUtils.sendErrorResponse(
        400,
        "Password and Confirm password should be same",
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
    delete req.body.confirmPassword;
    if (Object.keys(req.body).length > 4) {
      return responseUtils.sendErrorResponse(
        400,
        "You entered some extra fields which causing issue while signup",
        res
      );
    }
    next();
  } catch (err) {
    console.log(err);
    return responseUtils.sendErrorResponse(
      500,
      "Error while signup the user",
      res
    );
  }
};

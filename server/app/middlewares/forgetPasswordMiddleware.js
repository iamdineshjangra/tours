const validator = require("email-validator");
const responseUtils = require("../utils/sendResponse");

exports.forgetPasswordFormValidation = async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email) {
      return responseUtils.sendErrorResponse(
        400,
        "Please enter a email to change password",
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

    if (!validator.validate(email)) {
      return responseUtils.sendErrorResponse(
        400,
        "Email should be type email",
        res
      );
    }

    next();
  } catch (err) {
    console.log(err);
    return responseUtils.sendErrorResponse(
      500,
      "Error while forgeting the user",
      res
    );
  }
};

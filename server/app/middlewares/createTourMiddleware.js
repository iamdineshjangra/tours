const moment = require("moment");
const responseUtils = require("../utils/sendResponse");

module.exports = async (req, res, next) => {
  try {
    let {
      title,
      maxPersonCapacity,
      amountPerHead,
      startDate,
      endDate,
      image,
      organizer,
    } = req.body;

    if (!title || !maxPersonCapacity || !amountPerHead) {
      return responseUtils.sendErrorResponse(
        400,
        "Please enter all required fields",
        res
      );
    }

    const userTimeZone = moment().format("Z");

    if (startDate) {
      if (!moment(startDate).isValid()) {
        return responseUtils.sendErrorResponse(
          400,
          "Please provide a valid start date",
          res
        );
      }
      startDate = moment(startDate).utcOffset(userTimeZone).toISOString();
    }

    if (endDate) {
      if (!moment(endDate).isValid()) {
        return responseUtils.sendErrorResponse(
          400,
          "Please provide a valid end date",
          res
        );
      }
      endDate = moment(endDate).utcOffset(userTimeZone).toISOString();
    }

    if (image && typeof image === "string" && !image.startsWith("assets")) {
      return responseUtils.sendErrorResponse(
        400,
        "Image field is not allowed",
        res
      );
    }

    if (image && typeof image === "string" && !image.includes("images")) {
      return responseUtils.sendErrorResponse(
        400,
        "Image field is not allowed",
        res
      );
    }

    organizer = `${req.user.firstName} ${req.user.lastName}`;

    req.body = {
      title: title,
      maxPersonCapacity: maxPersonCapacity,
      amountPerHead: amountPerHead,
      startDate: startDate,
      endDate: endDate,
      image: image,
      organizer: organizer,
    };

    for (let key in req.body) {
      if (!req.body[key]) {
        delete req.body[key];
      }
    }

    next();
  } catch (err) {
    console.log(err);
    return responseUtils.sendErrorResponse(
      500,
      "Error while creating new tour",
      res
    );
  }
};

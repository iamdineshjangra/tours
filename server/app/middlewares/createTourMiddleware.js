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
      const startExpectedDate = moment().add(1, "day").toISOString();
      var providedStartDate = moment(startDate)
        .add(10, "seconds")
        .utcOffset(userTimeZone)
        .toISOString();
      if (providedStartDate > startExpectedDate) {
        startDate = moment(startDate).utcOffset(userTimeZone).toISOString();
      } else {
        return responseUtils.sendErrorResponse(
          400,
          "Start date should be 1 day greater than now",
          res
        );
      }
    }

    if (endDate) {
      if (!moment(endDate).isValid()) {
        return responseUtils.sendErrorResponse(
          400,
          "Please provide a valid end date",
          res
        );
      }
      const endExpectedDate = moment().add(2, "day").toISOString();
      var providedEndDate = moment(endDate)
        .add(10, "seconds")
        .utcOffset(userTimeZone)
        .toISOString();
      if (providedEndDate > endExpectedDate) {
        endDate = moment(endDate).utcOffset(userTimeZone).toISOString();
      } else {
        return responseUtils.sendErrorResponse(
          400,
          "End date should be 2 day greater than now",
          res
        );
      }
    }

    if(providedEndDate < providedStartDate) {
      return responseUtils.sendErrorResponse(400, "End Date should be greater than start date", res)
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

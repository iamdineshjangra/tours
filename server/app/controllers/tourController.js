const tourService = require("../services/tourService");
const responseUtils = require("../utils/sendResponse");

exports.getTours = async (req, res) => {
  try {
    const tours = await tourService.getTours();
    return res.status(200).json({
      status: "success",
      tours,
    });
  } catch (err) {
    console.log(err);
    return responseUtils.sendErrorResponse(
      500,
      "Error while getting all tours",
      res
    );
  }
};

exports.createTour = async (req, res) => {
  try {
    const tour = req.body;
    const newTour = await tourService.createTour(tour);
    return res.status(201).json({
      status: "success",
      tour: newTour,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "fail",
      errMessage: "Error while creating tours",
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    if (!tourId) {
      return responseUtils.sendErrorResponse(
        400,
        "Please provide tour Id in the endpoint to see tour details",
        res
      );
    }
    const tour = await tourService.getTour(tourId);
    if (!tour) {
      return responseUtils.sendErrorResponse(404, "Tour not found", res);
    }
    return res.status(200).json({
      status: "success",
      tour,
    });
  } catch (err) {
    console.log(err);
    return responseUtils.sendErrorResponse(
      500,
      "Error while finding tour",
      res
    );
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    if (!tourId) {
      return responseUtils.sendErrorResponse(
        400,
        "Tour id is not present in req",
        res
      );
    }
    await tourService.deleteTour(tourId);
    return res.status(204).json({
      status: "success",
      tour: null,
    });
  } catch (err) {
    console.log(err);
    return responseUtils.sendErrorResponse(
      500,
      "Error while deleting tour",
      res
    );
  }
};

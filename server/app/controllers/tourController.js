const db = require("../models");

exports.getTours = async (req, res) => {
  try {
    const tours = await db.Tour.findAll();
    return res.status(200).json({
      status: "success",
      tours,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "fail",
      errMessage: "Error while getting all tours",
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const tour = req.body;
    const newTour = await db.Tour.create(tour);
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
      return res.status(400).json({
        status: "fail",
        errMessage:
          "Please provide tour Id in the endpoint to see tour details",
      });
    }
    const tour = await db.Tour.findByPk(tourId);
    if (!tour) {
      return res.status(404).json({
        status: "fail",
        errMessage: "Tour not found",
      });
    }
    return res.status(200).json({
      status: "success",
      tour,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "fail",
      errMessage: "Error while finding tour",
    });
  }
};

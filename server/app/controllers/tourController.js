const tourService = require('../services/tourService');

exports.getTours = async (req, res) => {
  try {
    const tours = await tourService.getTours();
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
      return res.status(400).json({
        status: "fail",
        errMessage:
          "Please provide tour Id in the endpoint to see tour details",
      });
    }
    const tour = await tourService.getTour(tourId);
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

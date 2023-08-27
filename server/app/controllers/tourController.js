const db = require("../models");

exports.getTours = async (req, res) => {
  try {
    const tours = await db.tours.findAll();
    return res.status(200).json({
      tours
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
    const newTour = await db.tours.create(tour);
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

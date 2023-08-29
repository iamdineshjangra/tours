const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tourController");
router.route("/").post(tourController.createTour).get(tourController.getTours);
router.route("/:tourId").get(tourController.getTour);

module.exports = router;

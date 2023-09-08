const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tourController");
const protector = require("../controllers/authController");

router
  .route("/")
  .post(protector.protector, tourController.createTour)
  .get(protector.protector, tourController.getTours);
router.route("/:tourId").get(protector.protector, tourController.getTour);

module.exports = router;

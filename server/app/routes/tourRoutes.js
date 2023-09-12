const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tourController");
const authController = require("../controllers/authController");

router
  .route("/")
  .post(
    authController.protector,
    authController.authorization("admin", "organizer"),
    tourController.createTour
  )
  .get(authController.protector, tourController.getTours);
router
  .route("/:tourId")
  .get(authController.protector, tourController.getTour)
  .delete(
    authController.protector,
    authController.authorization("admin", "organizer"),
    tourController.deleteTour
  );

module.exports = router;

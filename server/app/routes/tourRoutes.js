const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tourController");
const authController = require("../controllers/authController");
const createTourMiddleware = require('../middlewares/createTourMiddleware');

router
  .route("/")
  .post(
    authController.protector,
    authController.authorization("admin", "organizer"),
    createTourMiddleware,
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

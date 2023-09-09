const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const loginMiddleware = require("../middlewares/loginMiddleware");
const signupMiddleware = require("../middlewares/signupMiddleware");
const forgetPasswordMiddleware = require("../middlewares/forgetPasswordMiddleware");
const resetPasswordMiddleware = require("../middlewares/resetPasswordMiddleware");
const userController = require('../controllers/userController')

router
  .route("/signup")
  .post(signupMiddleware.signupFormValidation, authController.signup);
router
  .route("/login")
  .post(loginMiddleware.loginFormValidation, authController.login);
router
  .route("/forgetPassword")
  .post(
    forgetPasswordMiddleware.forgetPasswordFormValidation,
    authController.forgetPassword
  );
router
  .route("/resetPassword")
  .patch(
    resetPasswordMiddleware.resetPasswordFormValidation,
    authController.resetPassword
  );

router.route("/users/me").get(authController.protector, userController.me)

module.exports = router;

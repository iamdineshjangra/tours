const express = require('express');
const router = express.Router()
const authController = require("../controllers/authController");
const loginMiddleware = require("../middlewares/loginMiddleware")

router.route("/signup").post(authController.signup);
router.route("/login").post(loginMiddleware.loginFormValidation, authController.login);
router.route("/forgetPassword").post(authController.forgetPassword);
router.route("/resetPassword").patch(authController.resetPassword);

module.exports = router;
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/users");

router
  .route("/signup")
  .get(userController.signupForm)
  .post(userController.signup);

router
  .route("/login")
  .get(userController.loginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/listings",
      failureFlash: true,
    }),
    userController.login
  );

router.get("/logout", userController.logout);

module.exports = router;

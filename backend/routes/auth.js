// Libraries Imports.
const express = require("express");
const { check } = require("express-validator");

// Model Imports.
const User = require("../models/user");

// Controller Imports.
const userController = require("../controller/auth");

const router = express.Router();

/**
 * Signup Route.
 * Name,Email And Password Validation.
 */
router.post(
  "/signup",
  [
    check("name", "Name should be at least 3 character long").isLength({
      min: 3,
    }),
    check("email", "Invalid Email Id")
      .isEmail()
      .bail()
      .custom((value) => {
        return User.find({ email: value }).then((user) => {
          if (user.length > 0) {
            return Promise.reject("Email Is Already Present");
          }
        });
      }),
    check("password", "Password should be at least 3 character long").isLength({
      min: 3,
    }),
  ],
  userController.signup
);

module.exports = router;

// Libraries Imports.
const express = require("express");
const { check } = require("express-validator");

// Model Imports.
const User = require("../models/user");

// Controller Imports.
const {
  signIn,
  signOut,
  signUp,
  isAdmin,
  isAuthenticated,
  isSignedIn,
} = require("../controller/auth");

// Create Express Router Instance.
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
  signUp
);

/**
 * Signin Route.
 * Route validation - email and password.
 */
router.post(
  "/signin",
  [
    check("email", "Email Is Required").not().isEmpty(),
    check("password", "Password Filed Is Required.").not().isEmpty(),
  ],
  signIn
);

/**
 * SignOut Route.
 */
router.get("/signout", signOut);

/**
 * TEST ROUTE
 * USED ONLY FOR TESTING PURPOSE.
 * YOU SHOULD UNABLE TO ACCESS THIS ROUTE.
 */
router.post(
  "/test",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  (request, response) => {
    response.json({
      message: "PROTECTED ROUTE",
    });
  }
);

module.exports = router;

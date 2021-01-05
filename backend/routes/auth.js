const express = require("express");
const router = express.Router();

const { check,validationResult } = require("express-validator");
const userController = require("../controller/auth");

router.post(
  "/signup",
  [
    check("name", "Name should be at least 3 character long").isLength({
      min: 3,
    }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 character long").isLength({
      min: 3,
    }),
  ],
  userController.signup
);

module.exports = router;

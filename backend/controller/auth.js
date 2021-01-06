// Library Imports
const { validationResult } = require("express-validator");

// Model Imports.
const User = require("../models/user");

/**
 * User Signup Method.
 */
exports.signup = (request, response) => {

  // Check for request validation results setup by express-validator.
  const error = validationResult(request);
  if (!error.isEmpty()) {
    // 422 Unprocessable Entity.
    return response.status(422).json({ error: getErrors(error.errors) });
  }

  // Save user data in DB.
  const user = new User(request.body);
  user.save((error, data) => {
    if (error) {
      // 500 Internal Server Error.
      return response
        .status(500)
        .json({ error: "Unable to save data in the DB." });
    }
    response.json({
      name: data.name,
      email: data.email,
      id: data._id,
    });
  });
};

/**
 * Returns - an array of objects with error.msg and error.param properties in it.
 */
function getErrors(errors) {
  return errors.map((item) => {
    const { msg, param } = item;
    return { msg, param };
  });
}

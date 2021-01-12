// Library Imports
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");

// Model Imports.
const User = require("../models/user");

/**
 * User Signup Method.
 */
exports.signUp = (request, response) => {
  // Check for request validation results, setup by express-validator.
  const error = validationResult(request);
  if (!error.isEmpty()) {
    // 422 Un-processable Entity.
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
 * User SignIn Method.
 */
exports.signIn = (request, response) => {
  // Destructuring request body into email and password.
  const { email, password } = request.body;

  // Check for request validation results, setup by express-validator.
  const error = validationResult(request);
  if (!error.isEmpty()) {
    return response.json({
      error: getErrors(error.errors),
    });
  }

  // Find User By Email.
  User.findOne({ email: email }, (error, user) => {
    // If user is not present.
    if (!user || error !== null) {
      // 500 Internal Server Error.
      return response.status(500).json({ error: "Unable to get user data." });
    }

    // Is user is unauthenticated.
    if (!user.authenticate(password)) {
      return response.status(401).json({ error: "Invalid Email Or Password" });
    }

    // Create a token.
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);

    // Destructuring user data.
    const { _id, email, userinfo, name } = user;

    // Set token to response cookie.
    response.cookie("token", token, { expire: new Date() + 9999 });

    // Send Response.
    response.json({
      token: token,
      data: { _id, email, userinfo, name },
    });
  });
};

/**
 * User SignOut Route.
 */
exports.signOut = (request, response) => {
  response.clearCookie("token");
  response.json({
    message: "User SignOut Successfully.",
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

/**
 * Is SignedIn Middleware.
 */
exports.isSignedIn = expressJWT({
  secret: process.env.TOKEN_SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

/**
 * Is Authenticated Middleware.
 */
exports.isAuthenticated = (request, response, next) => {
  console.log("INSIDE IS AUTHENTICATED")
  const isAuthenticated =
    request.profile &&
    request.auth &&
    request.profile._id == request.auth.userId;
  if (!isAuthenticated) {
    return response.status(403).json({
      message: "ACCESS DENIED",
    });
  }
  next();
};

/**
 * Is Admin Middleware.
 */
exports.isAdmin = (request, response, next) => {
  if (request.profile.role === 0) {
    return response.status(403).json({
      message: "UNAUTHORIZED TO ACCESS ADMIN ROUTE",
    });
  }
  next();
};

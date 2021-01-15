// Import Libraries.
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");

// Import utility methods.
const { BadRequest, ForbiddenError } = require("../utils/errors");

// Import Models.
const User = require("../models/user");

/**
 * User Signup Method.
 */
exports.signUp = (request, response, next) => {
  // Check for request validation results, setup by express-validator.
  let error = validationResult(request);
  if (!error.isEmpty()) {
    error = new BadRequest(getErrors(error.errors));
    return next(error);
  }

  // Save user data in DB.
  const user = new User(request.body);
  user.save((error, data) => {
    if (error) {
      error = new BadRequest("Unable To Save User Info Into DB.");
      return next(error);
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
exports.signIn = (request, response, next) => {
  // Destructuring request body into email and password.
  const { email, password } = request.body;

  // Check for request validation results, setup by express-validator.
  let error = validationResult(request);
  if (!error.isEmpty()) {
    error = new BadRequest(getErrors(error.errors));
    return next(error);
  }

  // Find User By Email.
  User.findOne({ email: email }, (error, user) => {
    // If user is not present.
    if (!user || error !== null) {
      return response.status(200).json({ error: "Unable to get user data." });
    }

    // Is user is unauthenticated.
    if (!user.authenticate(password)) {
      return response.status(200).json({ error: "Invalid Email Or Password" });
    }

    // Create a token.
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);

    // Destructuring user data.
    const { _id, email, userinfo, name, lastname} = user;

    // Set token to response cookie.
    response.cookie("token", token, { expire: new Date() + 9999 });

    // Send Response.
    response.json({
      token: token,
      data: { _id, email, userinfo, name, lastname },
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
  const isAuthenticated =
    request.profile &&
    request.auth &&
    request.profile._id == request.auth.userId;
  if (!isAuthenticated) {
    let error = new ForbiddenError("Unauthorized Request.");
    return next(error);
  }
  next();
};

/**
 * Is Admin Middleware.
 */
exports.isAdmin = (request, response, next) => {
  if (request.profile.role === 0) {
    let error = new ForbiddenError("Unauthorized Request.");
    return next(error);
  }
  next();
};

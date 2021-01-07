const User = require("../models/user");

/**
 * Get user by id param middleware.
 */
exports.getUserById = (request, response, next, id) => {
  // Find user by id.
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return response.status(400).json({
        error: "No User Found",
      });
    }
    // Create a request property and attach user data.
    request.profile = user;

    // Remove salt and password from request profile for security.
    request.profile.salt = undefined;
    request.profile.encryp_password = undefined;
    request.profile.createdAt = undefined;
    request.profile.updatedAt = undefined;
    next();
  });
};

exports.getUser = (request, response) => {
  return response.json(request.profile);
};

/**
 * Update user info.
 */
exports.updateUser = (request, response) => {
  User.findByIdAndUpdate(
    { _id: request.profile._id },
    { $set: request.body },
    { new: true, useFindAndModify: false },
    (error, user) => {
      if (error) {
        return response.status(400).json({
          message: "UNABLE TO UPDATE USER INFO",
        });
      }
      // Remove salt and password from request profile for security.
      user.salt = undefined;
      user.encryp_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      response.json(user);
    }
  );
};

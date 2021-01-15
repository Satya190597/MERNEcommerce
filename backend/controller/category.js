// Import Library.
const { validationResult } = require("express-validator");

// Import Utils.
const { BadRequest } = require("../utils/errors");
const { getErrors } = require("../utils/utility");

// Import model.
const Category = require("../models/category");

/**
 * Get Category By Id Middleware.
 * This middleware will fetch a single category based on category id.
 * And will attach the same to the incoming request.
 */
exports.getCategoryById = (request, response, next, id) => {
  Category.findById(id).exec((error, category) => {
    // Handle Error.
    if (error || !category) {
      error = new BadRequest("Unable To Get Category By Id");
      return next(error);
    }
    request.category = category;
    next();
  });
};

/**
 * Create category method.
 */
exports.createCategory = (request, response, next) => {
  // Check for request validation results, setup by express-validator.
  let error = validationResult(request);

  // Handle Error.
  if (!error.isEmpty()) {
    error = new BadRequest(getErrors(error.errors));
    return next(error);
  }

  const category = new Category(request.body);
  category.save((error, category) => {
    if (error) {
      return next(error);
    }
    response.json(category);
  });
};

/**
 * Get All Category Method.
 */
exports.getAllCategory = (request, response, next) => {
  Category.find().exec((error, categories) => {
    // Handle Error.
    if (error) {
      return next(error);
    }
    return response.json(categories);
  });
};

/**
 * Get A Single Category By Id.
 */
exports.getCategory = (request, response) => {
  response.json(request.category);
};

/**
 * Update Category By Id.
 */
exports.updateCategory = (request, response, next) => {
  Category.findByIdAndUpdate(
    { _id: request.category._id },
    { $set: request.body },
    { new: true, useFindAndModify: false },
    (error, category) => {
      // Handle Error.
      if (error) {
        return next(error);
      }
      response.json(category);
    }
  );
};

/**
 * Remove Category By Id.
 */
exports.removeCategory = (request, response, next) => {
  const category = request.category;
  category.remove((error, category) => {
    // Handle Error.
    if (error) {
      return next(error);
    }
    response.json({
      removedCategory: category,
      message: "CATEGORY GETS DELETED",
    });
  });
};

// Import model.
const { response } = require("express");
const Category = require("../models/category");

/**
 * Get Category By Id Middleware.
 */
exports.getCategoryById = (request, response, next, id) => {
  Category.findById(id).exec((error, category) => {
    if (error) {
      return response.status(400).json({
        message: "UNABLE TO GET CATEGORY",
      });
    }
    request.category = category;
    next();
  });
};

/**
 * Create category method.
 */
exports.createCategory = (request, response) => {
  const category = new Category(request.body);
  category.save((error, category) => {
    if (error) {
      return response.status(500).json({
        message: "UNABLE TO SAVE CATEGORY.",
      });
    }
    response.json(category);
  });
};

/**
 * Get All Category Method
 */
exports.getAllCategory = (request,response) => {
  Category.find().exec((error, categories) => {
    if (error) {
      return response.status(500).json({
        message: "UNABLE TO GET CATEGORY",
      });
    }
    return response.json(categories);
  });
};

/**
 * Get A Single Category.
 */
exports.getCategory = (request, response) => {
  response.json(request.category);
};

/**
 * Update Category
 */
exports.updateCategory = (request, response) => {
  Category.findByIdAndUpdate(
    { _id: request.category._id },
    { $set: request.body },
    { new: true, useFindAndModify:false },
    (error, category) => {
      if (error) {
        return response.status(500).json({
          message: "UNABLE TO SAVE CATEGORY",
        });
      }
      response.json(category);
    }
  );
};

/**
 * REMOVE CATEGORY
 */
exports.removeCategory = (request, response) => {
  const category = request.category;
  category.remove((error, category) => {
    if (error) {
      return response.status(500).json({
        message: "UNABLE TO REMOVE CATEGORY",
      });
    }
    response.json({
      removedCategory: category,
      message: "CATEGORY GETS DELETED",
    });
  });
};

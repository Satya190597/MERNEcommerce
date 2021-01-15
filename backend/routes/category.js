// Imports Libraries
const express = require("express");
const {check} = require("express-validator");

// Import Middleware.
const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
  removeCategory,
  updateCategory,
} = require("../controller/category");
const { isAuthenticated, isSignedIn, isAdmin } = require("../controller/auth");
const { getUserById } = require("../controller/user");

// Create Express Router Instance.
const router = express.Router();

/**
 * Note - 
 * The parameters of router.param() are name and a function. 
 * Where name is the actual name of parameter and function is the callback function.
 * Basically router.param() function triggers the callback function whenever user routes to the parameter
 */
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);


// Create A New Category - ROUTE.
router.post(
  "/category/create/:userId",
  [
    check("name").isLength({
      min:3
    })
    .withMessage("Category Name Must Be Three Character Long.")
    .trim()
    .escape()
  ],
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

// Get All Category - ROUTE.
router.get("/category/all", getAllCategory);

// Get Category By Id - ROUTE.
router.get("/category/:categoryId", getCategory);

// Update Category - ROUTE.
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

// Delete Category - ROUTE.
router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

module.exports = router;

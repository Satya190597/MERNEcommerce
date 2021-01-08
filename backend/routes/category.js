// Imports Libraries
const express = require("express");
const router = express.Router();

const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
  removeCategory,
  updateCategory
} = require("../controller/category");
const { isAuthenticated, isSignedIn, isAdmin } = require("../controller/auth");
const { getUserById } = require("../controller/user");

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// Route to save category.
// +++ TODO +++ [ADD VALIDATION TO CATEGORY SAVE ROUTE]
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

router.get("/category/all", getAllCategory);
router.get("/category/:categoryId", getCategory);

// UPDATE CATEGORY
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

// DELETE CATEGORY
router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

module.exports = router;

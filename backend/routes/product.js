// Import Libraries.
const express = require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controller/auth");

//Import Controllers
const {
  getProductById,
  getProduct,
  createProduct,
  photo,
  updateProduct,
  removeProduct,
} = require("../controller/product");
const { getUserById } = require("../controller/user");

const router = express.Router();

router.param("productId", getProductById);
router.param("userId", getUserById);

// get product by id.
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// CREATE A PRODUCT
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// DELETE ROUTE
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);

// UPDATE ROUTE
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

module.exports = router;

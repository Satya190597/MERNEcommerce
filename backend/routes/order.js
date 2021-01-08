const { request } = require("express");
const express = require("express");

const router = express.Router();

const { isSignedIn, isAdmin, isAuthenticated } = require("../controller/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controller/user");
const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrdersStatus,
  updateStatus,
} = require("../controller/order");
const { updateStock } = require("../controller/product");

// Params.
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// read route
//router.get("/order/:orderId", getOrder);
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

// UPDATE ORDER STATUS
router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrdersStatus
);
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;

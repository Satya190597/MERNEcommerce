// Import Libraries.
const express = require("express");

// Import Controllers.
const { isSignedIn, isAdmin, isAuthenticated } = require("../controller/auth");
const { getUserById, getUser,updateUser,userPurchaseList } = require("../controller/user");

const router = express.Router();

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/orders/user/:userId",isSignedIn,isAuthenticated, userPurchaseList);

module.exports = router;

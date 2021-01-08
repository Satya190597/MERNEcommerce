const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const productInCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

const orderSchema = new mongoose.Schema(
  {
    products: [productInCartSchema],
    transaction_id: {},
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Processing",
      enum: ["Cancelled","Delivered","Shipped","Processing","Received"]
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ProductInOrder = mongoose.model("ProductInCart", productInCartSchema);
const Order = mongoose.model("Order", orderSchema);

module.exports = {Order,ProductInOrder}

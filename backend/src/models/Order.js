const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    address: String,
    city: String,
    postalCode: String,
    phone: String,
  },
  items: [
    {
      productId: String,
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["pending", "paid", "delivered"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);

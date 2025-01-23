const Order = require("../models/Order");

// Get all orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("customer") // Assuming there's a customer reference
      .populate("items.productId"); // To get product details for each item

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// Get order by ID
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer")
      .populate("items.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    // Handle invalid ID format
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid order ID format" });
    }
    next(error);
  }
};

// Mark order as delivered
exports.markOrderAsDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if order is already delivered
    if (order.status === "delivered") {
      return res
        .status(400)
        .json({ message: "Order is already marked as delivered" });
    }

    // Check if order is paid (assuming orders should be paid before delivery)
    if (order.status !== "paid") {
      return res
        .status(400)
        .json({ message: "Order must be paid before marking as delivered" });
    }

    order.status = "delivered";
    await order.save();

    res.json({
      message: "Order marked as delivered successfully",
      order: order,
    });
  } catch (error) {
    // Handle invalid ID format
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid order ID format" });
    }
    next(error);
  }
};

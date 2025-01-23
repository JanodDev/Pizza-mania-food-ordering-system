const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.patch("/:id/deliver", orderController.markOrderAsDelivered);

module.exports = router;

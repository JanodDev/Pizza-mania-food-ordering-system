// routes/paymentRoutes.js
const express = require("express");
const {
  createPaymentIntent,
  handleWebhook,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/create-payment-intent", createPaymentIntent);
router.post("/webhook", handleWebhook);

module.exports = router;

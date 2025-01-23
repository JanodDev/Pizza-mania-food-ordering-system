// BACKEND/src/routes/payhereRoutes.js

const express = require("express");
const crypto = require("crypto");
const router = express.Router();

// Environment variable for merchant secret
const MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET;

router.post("/generate-hash", (req, res) => {
  try {
    const { merchant_id, order_id, amount, currency } = req.body;

    // Validate required fields
    if (!merchant_id || !order_id || !amount || !currency) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    // Create the hash
    const md5MerchantSecret = crypto
      .createHash("md5")
      .update(MERCHANT_SECRET)
      .digest("hex")
      .toUpperCase();

    const hash = crypto
      .createHash("md5")
      .update(merchant_id + order_id + amount + currency + md5MerchantSecret)
      .digest("hex")
      .toUpperCase();

    res.status(200).json({ hash });
  } catch (error) {
    console.error("Hash generation error:", error);
    res.status(500).json({
      error: "Error generating hash",
    });
  }
});

// Changed from export default to module.exports
module.exports = router;

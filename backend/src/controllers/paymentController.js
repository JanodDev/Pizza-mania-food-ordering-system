// controllers/paymentController.js
const Stripe = require("stripe");
const Order = require("../models/Order");
const { config } = require("../config/config");

const stripe = new Stripe(
  "sk_test_51QgJyFCIYew122LAInTiobGxC34G5Qtm9BVC43NXpVmP0srLBaXrZEvLCNSh7FaunIJ5CViBp4OwbdYGDv9dosnN00PwZGq4yU"
);

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, orderDetails } = req.body;

    // Create order in database
    const order = await Order.create({
      customer: {
        name: orderDetails.name,
        email: orderDetails.email,
        address: orderDetails.address,
        city: orderDetails.city,
        postalCode: orderDetails.postalCode,
        phone: orderDetails.phone,
      },
      items: orderDetails.items.map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: amount,
      status: "pending",
    });

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "inr",
      metadata: {
        orderId: order._id.toString(),
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderId: order._id,
    });
  } catch (error) {
    console.error("Payment Intent Error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating payment intent",
      error: error.message,
    });
  }
};

// Add a webhook handler to update order status
const handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      "whsec_47e91076957f19f474ad778496ebecefa35cd64827bee3560fbf475b43bb0d3d"
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    await Order.findByIdAndUpdate(paymentIntent.metadata.orderId, {
      status: "paid",
    });
  }

  res.json({ received: true });
};

module.exports = {
  createPaymentIntent,
  handleWebhook,
};

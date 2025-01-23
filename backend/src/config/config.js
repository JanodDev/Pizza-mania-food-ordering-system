require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/pizza-mania",
  nodeEnv: process.env.NODE_ENV || "development",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
};

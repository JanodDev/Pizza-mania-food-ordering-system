// src/app.js
const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const connectDB = require("./config/database");
const productRoutes = require("./routes/productRoutes");
const payhereRoutes = require("./routes/payHereRoutes");
const errorHandler = require("./middleware/errorHandler");
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Connect to database
connectDB();

app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/payhere", payhereRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

// Error handling
app.use(errorHandler);

// app.listen(config.port, () => {
//   console.log(`Server running on port ${config.port}`);
// });

module.exports = app;

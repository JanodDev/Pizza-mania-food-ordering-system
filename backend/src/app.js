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
const authRoutes = require("./routes/authRoutes");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5171",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
  },
});

// Connect to database
connectDB();

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("admin-connect", () => {
    socket.join("admin-room");
    console.log("Admin connected:", socket.id);
  });

  socket.on("new-order", (orderData) => {
    io.to("admin-room").emit("order-received", orderData);
  });

  socket.on("update-order-status", ({ orderId, status }) => {
    io.emit(`order-status-${orderId}`, { status });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Make io available throughout the app
app.set("io", io);

app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payhere", payhereRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

// Error handling
app.use(errorHandler);

module.exports = { app, server };

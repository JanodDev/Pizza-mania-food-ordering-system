const { Server } = require("socket.io");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:3000"], // Adjust ports as needed
      methods: ["GET", "POST"],
    },
  });

  // Store active connections
  const connections = new Map();

  io.on("connection", (socket) => {
    socket.on("admin-connect", () => {
      connections.set(socket.id, "admin");
      socket.join("admin-room");
    });

    socket.on("customer-connect", (customerId) => {
      connections.set(socket.id, customerId);
      socket.join(`customer-${customerId}`);
    });

    socket.on("new-order", (orderData) => {
      io.to("admin-room").emit("order-received", orderData);
    });

    socket.on("update-order-status", ({ orderId, status }) => {
      io.emit(`order-status-${orderId}`, { status });
    });

    socket.on("disconnect", () => {
      connections.delete(socket.id);
    });
  });

  return io;
};

module.exports = initializeSocket;

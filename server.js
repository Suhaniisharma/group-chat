const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chatMessage", (msgData) => {
    // Broadcast message to everyone except the sender
    socket.broadcast.emit("chatMessage", msgData);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});

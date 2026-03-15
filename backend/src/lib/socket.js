import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ENV.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

const userSocketMap = {}; // { userId: [socketIds] }

export function getReceiverSocketId(userId) {
  return userSocketMap[userId]?.[0];
}

io.on("connection", (socket) => {
  const userId = socket.user._id.toString();

  console.log("A user connected:", socket.user.fullName);

  if (!userSocketMap[userId]) {
    userSocketMap[userId] = [];
  }

  userSocketMap[userId].push(socket.id);

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.user.fullName);

    if (userSocketMap[userId]) {
      userSocketMap[userId] = userSocketMap[userId].filter(
        (id) => id !== socket.id,
      );

      if (userSocketMap[userId].length === 0) {
        delete userSocketMap[userId];
      }
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };

import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";

const app = express();
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
const __dirname = path.resolve();

// const PORT = ENV.PORT || 3000

// app.use(express.json());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Production Setup
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Use ENV.PORT properly
const PORT = ENV.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  connectDB();
});

import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();
const app = express()
const port = 3000

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

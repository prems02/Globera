import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { connectToSocket } from './Controllers/SocketManager.js';
import userRoutes from './routes/users.routes.js';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });  // load env first

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: '40kb' }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use("/api/v1/users", userRoutes);

app.get('/home', (req, res) => {
  res.send('Hello World');
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // 🔑 Start Express + Socket server here
    server.listen(app.get("port"), () => {
      console.log(`🚀 Server running on http://localhost:${app.get("port")}`);
    });

  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

start();

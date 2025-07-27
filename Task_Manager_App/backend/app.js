import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/user.js";
import taskRoutes from "./routes/task.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.log("❌ MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Welcome to the Task Manager API 📝");
});

app.use("/api/users", userRoutes);   
app.use("/api/tasks", taskRoutes);   

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

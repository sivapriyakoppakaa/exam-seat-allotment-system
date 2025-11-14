import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import seatsRouter from "./routes/seatRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/seats", seatsRouter);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

app.get("/", (_req, res) => {
  res.send("✅ Server is running successfully...");
});

app.listen(5000, () => console.log("Server running on port 5000"));

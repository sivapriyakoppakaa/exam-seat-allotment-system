import express from "express";
import Seat from "../models/Seat.js";

const router = express.Router();

// Get seat by roll number
router.get("/:rollNo", async (req, res) => {
  try {
    const seat = await Seat.findOne({ rollNo: req.params.rollNo });
    if (!seat) return res.status(404).json({ message: "Seat not found" });
    res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all seats
router.get("/", async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

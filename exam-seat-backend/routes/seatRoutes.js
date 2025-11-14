import express from "express";
import Seat from "../models/seat.js";

const router = express.Router();

// CREATE Seat
router.post("/", async (req, res) => {
  try {
    const { rollNo, semester, roomNo, session } = req.body;

    if (!rollNo || !semester || !roomNo || !session) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check duplicate by rollNo
    const exists = await Seat.findOne({ rollNo });
    if (exists) {
      return res.status(409).json({ message: "Seat or roll already exists" });
    }

    const seat = new Seat({ rollNo, semester, roomNo, session });
    await seat.save();

    res.status(201).json(seat);
  } catch (err) {
    console.error("POST /api/seats error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET all seats
router.get("/", async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one by roll number
router.get("/:rollNo", async (req, res) => {
  try {
    const seat = await Seat.findOne({ rollNo: req.params.rollNo });

    if (!seat)
      return res.status(404).json({ message: "Seat not found" });

    res.json(seat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;   // 🔥 THIS FIXES YOUR ERROR

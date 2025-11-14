import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },
  semester: { type: String, required: true },
  roomNo: { type: String, required: true },
  session: { type: String, enum: ["FN", "AN"], required: true }
});

export default mongoose.model("Seat", seatSchema);

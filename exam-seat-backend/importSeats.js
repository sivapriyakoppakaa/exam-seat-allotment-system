import mongoose from "mongoose";
import xlsx from "xlsx";
import Seat from "./models/Seat.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const workbook = xlsx.readFile("seats.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet);

const importData = async () => {
  try {
    await Seat.insertMany(data);
    console.log("✅ Seat data imported successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.log("❌ Error importing data:", error);
    mongoose.connection.close();
  }
};

importData();

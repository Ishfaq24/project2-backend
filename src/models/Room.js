import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true, unique: true },
  type: { type: String, enum: ["single", "double", "suite"], required: true },
  pricePerNight: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  image: { type: String }
});

export default mongoose.model("Room", roomSchema);

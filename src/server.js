import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import app from "./app.js";
import Room from "./models/Room.js";

dotenv.config();
const PORT = 5000; // Force port 5000

const seedRooms = async () => {
  const count = await Room.countDocuments();
  if (count === 0) {
    const sampleRooms = [
      { roomNumber: 101, type: "single", pricePerNight: 50, isAvailable: true, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
      { roomNumber: 102, type: "double", pricePerNight: 80, isAvailable: true, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80" },
      { roomNumber: 201, type: "suite", pricePerNight: 150, isAvailable: true, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80" },
      { roomNumber: 202, type: "double", pricePerNight: 90, isAvailable: true, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80" },
      { roomNumber: 301, type: "suite", pricePerNight: 200, isAvailable: true, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80" },
      { roomNumber: 103, type: "single", pricePerNight: 55, isAvailable: true, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
    ];
    await Room.insertMany(sampleRooms);
    console.log("✅ Rooms seeded successfully");
  }
};

connectDB().then(async () => {
  await seedRooms();
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
});

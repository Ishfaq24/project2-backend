import Room from "../models/Room.js";

// ✅ Get all available rooms
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find().sort({ roomNumber: 1 });
    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
      id : rooms._id,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Seed sample rooms (for development)
export const seedRooms = async (req, res, next) => {
  try {
    const sampleRooms = [
      { roomNumber: 101, type: "single", pricePerNight: 50, isAvailable: true },
      { roomNumber: 102, type: "double", pricePerNight: 80, isAvailable: true },
      { roomNumber: 201, type: "suite", pricePerNight: 150, isAvailable: true },
    ];

    await Room.deleteMany();
    const createdRooms = await Room.insertMany(sampleRooms);

    res.status(201).json({
      success: true,
      message: "Rooms seeded successfully",
      data: createdRooms,
      id : createdRooms._id,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ (Optional) Get room by ID
export const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room)
      return res.status(404).json({ success: false, message: "Room not found" });

    res.status(200).json({ success: true, data: room });
  } catch (err) {
    next(err);
  }
};

import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

const diffDays = (a, b) => Math.ceil((b - a) / (1000 * 60 * 60 * 24));

export const createBooking = async (req, res, next) => {
  try {
    const { roomId, checkIn, checkOut } = req.body;
    const room = await Room.findById(roomId);

    if (!room) return res.status(404).json({ message: "Room not found" });
    if (!room.isAvailable)
      return res.status(400).json({ message: "Room is not available" });

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = diffDays(checkInDate, checkOutDate);

    if (nights <= 0)
      return res.status(400).json({ message: "Invalid check-in/check-out" });

    const totalPrice = room.pricePerNight * nights;

    const booking = await Booking.create({
      user: req.user._id,
      room: room._id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalPrice
    });

    room.isAvailable = false;
    await room.save();

    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
};

export const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("room");
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

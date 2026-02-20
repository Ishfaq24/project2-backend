import Review from "../models/Review.js";
import Room from "../models/Room.js";

export const createReview = async (req, res, next) => {
  try {
    const { roomId, rating, comment } = req.body;
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const review = await Review.create({
      user: req.user._id,
      room: roomId,
      rating,
      comment
    });

    // Update room's average rating
    const reviews = await Review.find({ room: roomId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    room.rating = Math.round(avgRating * 10) / 10;
    await room.save();

    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

export const getRoomReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ room: req.params.roomId })
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createBooking, getUserBookings } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my-bookings", protect, getUserBookings);

export default router;

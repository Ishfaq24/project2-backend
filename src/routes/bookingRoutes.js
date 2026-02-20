import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createBooking, getUserBookings } from "../controllers/bookingController.js";
import { bookingValidation } from "../middleware/validation.js";

const router = express.Router();

router.post("/", protect, bookingValidation, createBooking);
router.get("/my-bookings", protect, getUserBookings);

export default router;

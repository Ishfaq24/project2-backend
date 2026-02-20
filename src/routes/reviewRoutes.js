import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createReview, getRoomReviews } from "../controllers/reviewController.js";
import { reviewValidation } from "../middleware/validation.js";

const router = express.Router();

router.post("/", protect, reviewValidation, createReview);
router.get("/:roomId", getRoomReviews);

export default router;

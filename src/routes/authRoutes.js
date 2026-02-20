import express from "express";
import { registerUser, loginUser, logoutUser, getProfile, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { registerValidation, loginValidation, validate } from "../middleware/validation.js";

const profileValidation = [
  (req, res, next) => {
    if (req.body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
    }
    if (req.body.name && (req.body.name.trim().length < 2 || req.body.name.trim().length > 50)) {
      return res.status(400).json({ message: 'Name must be 2-50 characters' });
    }
    next();
  }
];

const router = express.Router();

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, profileValidation, updateProfile);

export default router;

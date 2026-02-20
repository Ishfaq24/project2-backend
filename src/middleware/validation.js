import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Validation failed', 
      errors: errors.array() 
    });
  }
  next();
};

export const registerValidation = [
  // Name validation
  (req, res, next) => {
    if (!req.body.name || req.body.name.trim().length < 2) {
      return res.status(400).json({ message: 'Name must be at least 2 characters' });
    }
    if (req.body.name.trim().length > 50) {
      return res.status(400).json({ message: 'Name must be less than 50 characters' });
    }
    next();
  },
  // Email validation
  (req, res, next) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!req.body.email || !emailRegex.test(req.body.email)) {
      return res.status(400).json({ message: 'Please provide a valid email' });
    }
    next();
  },
  // Password validation
  (req, res, next) => {
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    if (req.body.password.length > 100) {
      return res.status(400).json({ message: 'Password must be less than 100 characters' });
    }
    next();
  }
];

export const loginValidation = [
  (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    next();
  }
];

export const bookingValidation = [
  (req, res, next) => {
    if (!req.body.roomId) {
      return res.status(400).json({ message: 'Room ID is required' });
    }
    if (!req.body.checkIn || !req.body.checkOut) {
      return res.status(400).json({ message: 'Check-in and check-out dates are required' });
    }
    const checkIn = new Date(req.body.checkIn);
    const checkOut = new Date(req.body.checkOut);
    if (checkIn >= checkOut) {
      return res.status(400).json({ message: 'Check-out must be after check-in' });
    }
    if (checkIn < new Date()) {
      return res.status(400).json({ message: 'Check-in date cannot be in the past' });
    }
    next();
  }
];

export const reviewValidation = [
  (req, res, next) => {
    if (!req.body.roomId) {
      return res.status(400).json({ message: 'Room ID is required' });
    }
    if (!req.body.rating || req.body.rating < 1 || req.body.rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    if (!req.body.comment || req.body.comment.trim().length < 5) {
      return res.status(400).json({ message: 'Comment must be at least 5 characters' });
    }
    if (req.body.comment.length > 500) {
      return res.status(400).json({ message: 'Comment must be less than 500 characters' });
    }
    next();
  }
];

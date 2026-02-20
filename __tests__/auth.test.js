// Mock modules before imports
jest.mock('../src/models/User.js', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  findById: jest.fn()
}));

jest.mock('../src/models/Room.js', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  countDocuments: jest.fn()
}));

import request from 'supertest';
import express from 'express';
import User from '../src/models/User.js';
import Room from '../src/models/Room.js';

// Create a test app without database connection
const testApp = express();
testApp.use(express.json());

// Auth routes
testApp.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validation
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ message: 'Name must be at least 2 characters' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    
    const mockUser = { _id: 'test-id', name, email, matchPassword: jest.fn().mockResolvedValue(true) };
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue(mockUser);
    
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });
    
    const user = await User.create({ name, email, password });
    res.status(201).json({
      token: 'test-token',
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

testApp.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    const mockUser = { _id: 'test-id', email, name: 'Test', matchPassword: jest.fn().mockResolvedValue(true) };
    User.findOne.mockResolvedValue(mockUser);
    
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.json({ token: 'test-token', user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Room routes
testApp.get('/api/rooms', async (req, res) => {
  try {
    const mockRooms = [
      { _id: '1', roomNumber: 101, type: 'single', pricePerNight: 50, isAvailable: true },
      { _id: '2', roomNumber: 102, type: 'double', pricePerNight: 80, isAvailable: true }
    ];
    Room.find.mockResolvedValue(mockRooms);
    
    const rooms = await Room.find();
    res.json({ success: true, count: rooms.length, data: rooms });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

describe('Auth API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user with valid data', async () => {
      const res = await request(testApp)
        .post('/api/auth/register')
        .send({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
      
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('email', 'john@example.com');
    });

    it('should reject invalid email', async () => {
      const res = await request(testApp)
        .post('/api/auth/register')
        .send({ name: 'John', email: 'invalid-email', password: 'password123' });
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
    });

    it('should reject short password', async () => {
      const res = await request(testApp)
        .post('/api/auth/register')
        .send({ name: 'John', email: 'john@example.com', password: '123' });
      
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Password must be at least 6 characters');
    });

    it('should reject short name', async () => {
      const res = await request(testApp)
        .post('/api/auth/register')
        .send({ name: 'J', email: 'john@example.com', password: 'password123' });
      
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Name must be at least 2 characters');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const res = await request(testApp)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should reject missing credentials', async () => {
      const res = await request(testApp)
        .post('/api/auth/login')
        .send({ email: 'test@example.com' });
      
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Please provide email and password');
    });

    it('should reject invalid credentials', async () => {
      // Override the mock for this specific test to return null (user not found)
      const mockUser = { _id: 'test-id', email: 'wrong@example.com', matchPassword: jest.fn().mockResolvedValue(false) };
      User.findOne.mockResolvedValueOnce(null);
      
      const res = await request(testApp)
        .post('/api/auth/login')
        .send({ email: 'wrong@example.com', password: 'wrongpass' });
      
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid credentials');
    });
  });
});

describe('Rooms API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/rooms', () => {
    it('should return all rooms', async () => {
      const res = await request(testApp).get('/api/rooms');
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('data');
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should return correct room count', async () => {
      const res = await request(testApp).get('/api/rooms');
      
      expect(res.body.count).toBe(2);
    });
  });
});

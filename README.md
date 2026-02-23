# HotelSeeView

A full-stack hotel room booking application built with React and Node.js.

## Description

HotelSeeView allows users to browse hotel rooms, make bookings, and manage their reservations. The application features user authentication, room listings, booking management, and room reviews.

## Tech Stack

### Frontend
- React 19
- React Router 7
- Vite
- Tailwind CSS 4

### Backend
- Express.js
- MongoDB with Mongoose
- JSON Web Token (JWT)
- bcryptjs

### Database
- MongoDB

---

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB** (local or cloud instance like MongoDB Atlas)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Ishfaq24/HotelSeeView.git
cd HotelSeeView
```

### 2. Install Backend Dependencies

```bash
cd intern-project2-backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## Configuration

### Backend Environment Variables

Create a `.env` file in the `intern-project2-backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/hotelseeview
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MongoDB connection string` | MongoDB URI | `mongodb://localhost:27017/hotelseeview` |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `NODE_ENV` | Environment mode | `development` |

### MongoDB Setup

**Option 1: Local MongoDB**
- Install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
- Start the MongoDB service
- Use the default connection string: `mongodb://localhost:27017/hotelseeview`

**Option 2: MongoDB Atlas**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string
- Replace `MONGO_URI` with your Atlas connection string

---

## Running the Application

### Start the Backend

```bash
cd intern-project2-backend

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend server will run at `http://localhost:5000`

### Start the Frontend

```bash
cd frontend

# Development mode
npm run dev

# Production build
npm run build
```

The frontend will run at `http://localhost:5173`

---

## Available Scripts

### Frontend (`frontend/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

### Backend (`intern-project2-backend/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start server with nodemon (auto-reload) |
| `npm start` | Start production server |
| `npm test` | Run Jest tests |

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get room by ID

### Bookings
- `POST /api/bookings` - Create a booking
- `GET /api/bookings/my-bookings` - Get user's bookings

### Reviews
- `GET /api/reviews/room/:roomId` - Get reviews for a room
- `POST /api/reviews` - Create a review

---

## Testing

Run backend tests:

```bash
cd intern-project2-backend
npm test
```

---

## Project Structure

```
HotelSeeView/
├── frontend/                    # React Frontend
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React Context
│   │   ├── services/          # API services
│   │   ├── App.jsx            # Root component
│   │   └── main.jsx           # Entry point
│   └── package.json
│
├── intern-project2-backend/    # Express Backend
│   ├── src/
│   │   ├── config/            # Database config
│   │   ├── controllers/       # Request handlers
│   │   ├── middleware/       # Express middleware
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # API routes
│   │   ├── app.js             # Express app
│   │   └── server.js          # Server entry
│   └── package.json
│
├── ARCHITECTURE.md             # Architecture documentation
└── README.md                   # This file
```

---

## License

ISC

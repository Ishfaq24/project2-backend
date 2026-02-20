const API_URL = 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  // Auth
  register: async (userData) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  login: async (credentials) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    if (data.user?.token) localStorage.setItem('token', data.user.token);
    return data;
  },

  logout: async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: { ...getAuthHeader() },
    });
    localStorage.removeItem('token');
  },

  // Rooms
  getRooms: async () => {
    const res = await fetch(`${API_URL}/rooms`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch rooms');
    return data.data || data;
  },

  getRoomById: async (id) => {
    const res = await fetch(`${API_URL}/rooms/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch room');
    return data.data || data;
  },

  // Bookings
  createBooking: async (bookingData) => {
    const res = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(bookingData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Booking failed');
    return data;
  },

  getMyBookings: async () => {
    const res = await fetch(`${API_URL}/bookings/my-bookings`, {
      headers: { ...getAuthHeader() },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch bookings');
    return data;
  },
};

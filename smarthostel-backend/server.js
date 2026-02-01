// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import route files
const studentRoutes = require('./routes/student');
// const adminRoutes = require('./routes/admin'); // Uncomment when admin.js is ready

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/student', studentRoutes);
// app.use('/admin', adminRoutes); // Uncomment when admin routes are ready

// Test route
app.get('/', (req, res) => {
  res.send({ message: 'SmartHostel API Running' });
});

// Error handling for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const studentRoutes = require('./routes/student');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Mount student routes
app.use('/student', studentRoutes);

// ✅ Root health check
app.get('/', (req, res) => {
  res.json({ status: 'Smart Hostel Backend Running' });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(err => {
    console.error('MongoDB error:', err);
  });

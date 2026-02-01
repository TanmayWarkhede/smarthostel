const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// ✅ TEST ROUTE
router.get('/test', (req, res) => {
  res.json({ message: 'Student route working' });
});

// ✅ LOGIN ROUTE
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password required',
      });
    }

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({
        message: 'Student not found',
      });
    }

    // ❗ Plain password check (for now)
    if (student.password !== password) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    res.status(200).json({
      message: 'Login successful',
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

module.exports = router;
router.get('/ping', (req, res) => {
  res.json({ message: 'Student API alive' });
});

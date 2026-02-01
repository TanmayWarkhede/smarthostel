// routes/student.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); // Your Mongoose model

// Ping route to test API
router.get('/ping', (req, res) => {
  res.json({ message: 'Student API alive' });
});

// Login route
router.post('/login', async (req, res) => {
  const { emailId, password } = req.body;

  // Check if email and password are provided
  if (!emailId || !password) {
    return res.status(400).json({
      message: 'Email and password required',
    });
  }

  try {
    const student = await Student.findOne({ emailId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Replace with proper password check (hash compare if using bcrypt)
    if (student.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({
      status: 'SUCCESS',
      result: [student],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register student
router.post('/saveStudent', async (req, res) => {
  const {
    userName,
    emailId,
    password,
    roleId,
    firstName,
    lastName,
    phoneNumber,
    roomNumber,
    block,
  } = req.body;

  if (!emailId || !password || !userName) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  try {
    const existingStudent = await Student.findOne({ emailId });
    if (existingStudent) {
      return res.status(202).json({ status: 'Student Already Exists' });
    }

    const newStudent = new Student({
      userName,
      emailId,
      password, // Ideally hash this password
      roleId,
      firstName,
      lastName,
      phoneNumber,
      roomNumber,
      block,
    });

    await newStudent.save();
    res.status(202).json({ status: 'Student created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

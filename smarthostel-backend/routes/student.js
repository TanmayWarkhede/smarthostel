const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// ✅ LOGIN ROUTE
// POST /student/login
router.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body; // <-- use emailId here

    // Check if both fields are provided
    if (!emailId || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    // Find the student by emailId
    const student = await Student.findOne({ emailId });

    if (!student) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password (assuming plain text for now, or use bcrypt)
    if (student.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Success response
    return res.status(200).json({
      status: "SUCCESS",
      result: [student], // wrap in array to match your Flutter UserResponse
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

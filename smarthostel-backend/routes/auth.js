const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { userName, emailId, password, firstName, lastName, phoneNumber, roomNumber, block } = req.body;
  try {
    let student = await Student.findOne({ emailId });
    if (student) return res.status(400).json({ status: "Student Already Exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    student = new Student({ userName, emailId, password: hashedPassword, firstName, lastName, phoneNumber, roomNumber, block });
    await student.save();
    res.status(201).json({ status: "Student created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const student = await Student.findOne({ emailId });
    if (!student) return res.status(400).json({ status: "FAILED", error: "User not found" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ status: "FAILED", error: "Invalid credentials" });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ status: "SUCCESS", token, result: [student] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

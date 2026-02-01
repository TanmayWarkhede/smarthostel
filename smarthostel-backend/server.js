const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Smart Hostel Backend is running 🚀");
});

// LOGIN API
app.post("/student/login", (req, res) => {
  const { email, password } = req.body;

  // TEMP hardcoded user (for testing)
  if (email === "test@gmail.com" && password === "123456") {
    return res.status(200).json({
      message: "Login successful",
      roleId: 1,
      email: email,
    });
  }

  return res.status(401).json({
    message: "Invalid email or password",
  });
});

// REGISTER API
app.post("/student/saveStudent", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password required",
    });
  }

  return res.status(201).json({
    message: "Student registered successfully",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

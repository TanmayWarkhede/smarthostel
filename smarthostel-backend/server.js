const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/issue", require("./routes/issue"));
app.use("/api/room", require("./routes/room"));

app.get("/", (req, res) => res.send("Smart Hostel Backend is running 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

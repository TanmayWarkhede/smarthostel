const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  phoneNumber: Number,
  roomNumber: Number,
  block: String,
  roleId: { type: Number, default: 2 }, // 2 = student
});

module.exports = mongoose.model("Student", StudentSchema);

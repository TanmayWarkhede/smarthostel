const mongoose = require("mongoose");

const RoomChangeSchema = new mongoose.Schema({
  currentRoomNumber: Number,
  toChangeRoomNumber: Number,
  currentBlock: String,
  toChangeBlock: String,
  changeReason: String,
  studentEmailId: String,
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("RoomChangeRequest", RoomChangeSchema);

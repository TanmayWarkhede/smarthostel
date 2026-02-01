const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  roomNumber: Number,
  block: String,
  issue: String,
  studentComment: String,
  studentEmailId: String,
  staffComment: { type: String, default: "" },
  issueStatus: { type: String, default: "Open" },
});

module.exports = mongoose.model("Issue", IssueSchema);

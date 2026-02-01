const express = require("express");
const RoomChangeRequest = require("../models/RoomChangeRequest");
const router = express.Router();

// Create room change request
router.post("/request", async (req, res) => {
  try {
    const request = new RoomChangeRequest(req.body);
    await request.save();
    res.status(201).json({ statusCode: 200, status: "Room Change Requested" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve/Reject
router.post("/action/:id", async (req, res) => {
  try {
    const request = await RoomChangeRequest.findById(req.params.id);
    request.status = req.body.action; // "Approved" or "Rejected"
    await request.save();
    res.json({ statusCode: 200, status: `Room Change ${request.status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

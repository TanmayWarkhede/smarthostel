const express = require("express");
const Issue = require("../models/Issue");
const router = express.Router();

// Create issue
router.post("/create", async (req, res) => {
  try {
    const issue = new Issue(req.body);
    await issue.save();
    res.status(201).json({ statusCode: 200, status: "Issue Created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Close issue
router.post("/close/:id", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    issue.staffComment = req.body.staffComment || "Resolved";
    issue.issueStatus = "Closed";
    await issue.save();
    res.json({ statusCode: 200, status: "Issue Closed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

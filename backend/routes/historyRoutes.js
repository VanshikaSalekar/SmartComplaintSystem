// backend/routes/historyRoutes.js

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import ComplaintHistory from "../models/ComplaintHistory.js";

const router = express.Router();

// GET complaint history by complaintId
// route: GET /api/history/:complaintId
router.get("/:complaintId", authMiddleware, async (req, res) => {
  try {
    const history = await ComplaintHistory.find({
      complaint: req.params.complaintId,
    })
      .populate("changedBy", "name email role")
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch complaint history" });
  }
});

export default router;
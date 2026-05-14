// backend/routes/statusRoutes.js

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import Status from "../models/Status.js";

const router = express.Router();

// Get all statuses (Public/User/Admin)
router.get("/", async (req, res) => {
  try {
    const statuses = await Status.find({ isActive: true }).sort({ name: 1 });
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch statuses" });
  }
});

// Create status (Admin only)
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description, color } = req.body;

    const statusExists = await Status.findOne({ name });
    if (statusExists) {
      return res.status(400).json({ message: "Status already exists" });
    }

    const status = await Status.create({
      name,
      description,
      color,
    });

    res.status(201).json(status);
  } catch (error) {
    res.status(500).json({ message: "Failed to create status" });
  }
});

export default router;
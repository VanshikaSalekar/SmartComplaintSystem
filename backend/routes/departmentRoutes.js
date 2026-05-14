// backend/routes/departmentRoutes.js

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import Department from "../models/Department.js";

const router = express.Router();

// Get all departments (Public/User/Admin)
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find({ isActive: true }).sort({
      name: 1,
    });

    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch departments" });
  }
});

// Create department (Admin only)
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description, contactEmail } = req.body;

    const depExists = await Department.findOne({ name });
    if (depExists) {
      return res.status(400).json({ message: "Department already exists" });
    }

    const department = await Department.create({
      name,
      description,
      contactEmail,
    });

    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ message: "Failed to create department" });
  }
});

export default router;
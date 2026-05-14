// backend/routes/adminRoutes.js

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  getAllComplaintsAdmin,
  getComplaintByIdAdmin,
  updateComplaintAdmin,
  getReportsAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

// Admin - Get all complaints (with filters)
router.get("/complaints", authMiddleware, adminMiddleware, getAllComplaintsAdmin);

// Admin - Get single complaint details
router.get(
  "/complaints/:id",
  authMiddleware,
  adminMiddleware,
  getComplaintByIdAdmin
);

// Admin - Update complaint (status, department, remarks)
router.patch(
  "/complaints/:id",
  authMiddleware,
  adminMiddleware,
  updateComplaintAdmin
);

// Admin - Reports
router.get("/reports", authMiddleware, adminMiddleware, getReportsAdmin);

export default router;
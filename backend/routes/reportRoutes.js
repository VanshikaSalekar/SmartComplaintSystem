// backend/routes/reportRoutes.js

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { generateReport } from "../controllers/reportController.js";

const router = express.Router();

// Generate report (Admin only)
router.get("/", authMiddleware, adminMiddleware, generateReport);

export default router;
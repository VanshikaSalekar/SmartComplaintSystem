// backend/routes/authRoutes.js

import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get logged-in user
router.get("/me", authMiddleware, getMe);

export default router;
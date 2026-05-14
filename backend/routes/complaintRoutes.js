// backend/routes/complaintRoutes.js

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createComplaint,
  getMyComplaints,
  getComplaintById,
} from "../controllers/complaintController.js";

import multer from "multer";
import path from "path";

// Multer storage setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed (jpg, jpeg, png)"), false);
  }
};

const upload = multer({ storage, fileFilter });

const router = express.Router();

// Create Complaint (with optional image)
router.post("/", authMiddleware, upload.single("image"), createComplaint);

// Get logged-in user's complaints
router.get("/my", authMiddleware, getMyComplaints);

// Get single complaint by ID
router.get("/:id", authMiddleware, getComplaintById);

export default router;
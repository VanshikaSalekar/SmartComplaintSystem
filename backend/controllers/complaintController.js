// backend/controllers/complaintController.js

import Complaint from "../models/Complaint.js";
import ComplaintHistory from "../models/ComplaintHistory.js";

export const createComplaint = async (req, res) => {
  try {
    let { category, description, location } = req.body;

    category = category?.trim();
    description = description?.trim();
    location = location?.trim().toLowerCase();

    if (!category || !description || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Smart Auto Department Assignment (Rule-Based Routing)
    let autoDepartment = "Not Assigned";

    if (category === "Water") autoDepartment = "Plumbing";
    if (category === "Electricity") autoDepartment = "Electrical";
    if (category === "Internet") autoDepartment = "IT";
    if (category === "Cleanliness") autoDepartment = "Cleaning";
    if (category === "Maintenance") autoDepartment = "Maintenance";

    // Smart Priority Prediction (Keyword Based NLP)
    let autoPriority = "Low";

    const text = description.toLowerCase();

    if (
      text.includes("fire") ||
      text.includes("short circuit") ||
      text.includes("electric shock") ||
      text.includes("danger") ||
      text.includes("burst") ||
      text.includes("gas") ||
      text.includes("urgent")
    ) {
      autoPriority = "High";
    } else if (
      text.includes("leak") ||
      text.includes("broken") ||
      text.includes("not working") ||
      text.includes("damage") ||
      text.includes("issue")
    ) {
      autoPriority = "Medium";
    }

    let deadlineAt = new Date();

    if (autoPriority === "High") {
      deadlineAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    } else if (autoPriority === "Medium") {
      deadlineAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    } else {
      deadlineAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    }

    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const duplicateComplaint = await Complaint.findOne({
      category,
      location,
      createdAt: { $gte: last24Hours },
    }).sort({ createdAt: -1 });

    const complaint = await Complaint.create({
      user: req.user._id,
      category,
      description,
      location,
      department: autoDepartment,
      priority: autoPriority,
      deadlineAt,
      isOverdue: false,
      isDuplicate: duplicateComplaint ? true : false,
      duplicateOf: duplicateComplaint ? duplicateComplaint._id : null,
      image: req.file ? `uploads/${req.file.filename}` : "",
    });

    // Save initial history
    await ComplaintHistory.create({
      complaint: complaint._id,
      oldStatus: "",
      newStatus: "Pending",
      remark: duplicateComplaint
        ? `Complaint created | Auto Dept: ${autoDepartment} | Auto Priority: ${autoPriority} | Duplicate of ${duplicateComplaint.complaintId}`
        : `Complaint created | Auto Dept: ${autoDepartment} | Auto Priority: ${autoPriority}`,
      changedBy: req.user._id,
      department: complaint.department,
    });

    res.status(201).json(complaint);
  } catch (error) {
    console.log("CREATE COMPLAINT ERROR:", error);
    res.status(500).json({
      message: "Failed to create complaint",
      error: error.message,
    });
  }
};

export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
};

// @desc Get Complaint By ID (User)
// @route GET /api/complaints/:id
export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Ensure complaint belongs to logged-in user (unless admin)
    if (
      complaint.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch complaint" });
  }
};
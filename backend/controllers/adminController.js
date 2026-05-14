// backend/controllers/adminController.js

import Complaint from "../models/Complaint.js";
import ComplaintHistory from "../models/ComplaintHistory.js";

// @desc Get all complaints (Admin)
// @route GET /api/admin/complaints
export const getAllComplaintsAdmin = async (req, res) => {
  try {
    const { status, category, fromDate, toDate } = req.query;

    let filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;

    if (fromDate || toDate) {
      filter.createdAt = {};
      if (fromDate) filter.createdAt.$gte = new Date(fromDate);
      if (toDate) filter.createdAt.$lte = new Date(toDate);
    }

    await Complaint.updateMany(
      {
        status: { $ne: "Resolved" },
        deadlineAt: { $lt: new Date() },
      },
      { $set: { isOverdue: true } }
    );

    await Complaint.updateMany(
      {
        status: "Resolved",
      },
      { $set: { isOverdue: false } }
    );

    const complaints = await Complaint.find(filter)
      .populate("user", "name email")
      .populate("duplicateOf", "complaintId")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
};

// @desc Get complaint by id (Admin)
// @route GET /api/admin/complaints/:id
export const getComplaintByIdAdmin = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("user", "name email phone hostelBlock roomNo")
      .populate("duplicateOf", "complaintId");

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch complaint details" });
  }
};

// @desc Update complaint (Admin)
// @route PATCH /api/admin/complaints/:id
export const updateComplaintAdmin = async (req, res) => {
  try {
    const { status, department, remarks } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const oldStatus = complaint.status;

    if (status) complaint.status = status;
    if (department) complaint.department = department;
    if (remarks) complaint.remarks = remarks;

    if (status === "Resolved" && !complaint.resolvedAt) {
      complaint.resolvedAt = new Date();
    }

    if (status && status !== "Resolved") {
      complaint.resolvedAt = null;
    }

    await complaint.save();

    // Save history log
    await ComplaintHistory.create({
      complaint: complaint._id,
      oldStatus,
      newStatus: complaint.status,
      remark: remarks || "",
      changedBy: req.user._id,
      department: complaint.department,
    });

    res.json({
      message: "Complaint updated successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update complaint" });
  }
};

// @desc Reports (Admin)
// @route GET /api/admin/reports
export const getReportsAdmin = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();

    const pending = await Complaint.countDocuments({ status: "Pending" });
    const inProgress = await Complaint.countDocuments({ status: "In Progress" });
    const resolved = await Complaint.countDocuments({ status: "Resolved" });
    const rejected = await Complaint.countDocuments({ status: "Rejected" });

    const categories = ["Water", "Electricity", "Internet", "Cleanliness", "Maintenance"];

    let categoryStats = {};

    for (let cat of categories) {
      categoryStats[cat] = await Complaint.countDocuments({ category: cat });
    }

    res.json({
      total,
      pending,
      inProgress,
      resolved,
      rejected,
      categoryStats,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate reports" });
  }
};
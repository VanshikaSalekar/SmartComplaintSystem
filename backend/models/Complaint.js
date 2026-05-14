// backend/models/Complaint.js

import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      unique: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      enum: ["Water", "Electricity", "Internet", "Cleanliness", "Maintenance"],
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    department: {
      type: String,
      default: "Not Assigned",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },

    deadlineAt: {
      type: Date,
      default: null,
    },

    isOverdue: {
      type: Boolean,
      default: false,
    },

    isDuplicate: {
      type: Boolean,
      default: false,
    },

    duplicateOf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      default: null,
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Rejected"],
      default: "Pending",
    },

    resolvedAt: {
      type: Date,
      default: null,
    },

    remarks: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// ✅ Normalize location
complaintSchema.pre("save", function () {
  if (this.location) {
    this.location = this.location.trim().toLowerCase();
  }
});

// ✅ Generate complaintId safely
complaintSchema.pre("save", async function () {
  if (this.complaintId) return;

  const count = await mongoose.model("Complaint").countDocuments();
  const year = new Date().getFullYear();

  this.complaintId = `CMP-${year}-${String(count + 1).padStart(4, "0")}`;
});

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;
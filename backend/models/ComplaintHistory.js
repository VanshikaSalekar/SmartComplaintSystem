// backend/models/ComplaintHistory.js

import mongoose from "mongoose";

const complaintHistorySchema = new mongoose.Schema(
  {
    complaint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      required: true,
    },

    oldStatus: {
      type: String,
      default: "",
    },

    newStatus: {
      type: String,
      required: true,
    },

    remark: {
      type: String,
      default: "",
    },

    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    department: {
      type: String,
      default: "",
    },

    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const ComplaintHistory = mongoose.model(
  "ComplaintHistory",
  complaintHistorySchema
);

export default ComplaintHistory;
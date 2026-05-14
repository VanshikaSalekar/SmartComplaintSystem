// backend/models/ComplaintRemark.js

import mongoose from "mongoose";

const complaintRemarkSchema = new mongoose.Schema(
  {
    complaint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      required: true,
    },

    remark: {
      type: String,
      required: true,
      trim: true,
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    isInternal: {
      type: Boolean,
      default: true, // admin-only notes by default
    },
  },
  { timestamps: true }
);

const ComplaintRemark = mongoose.model(
  "ComplaintRemark",
  complaintRemarkSchema
);

export default ComplaintRemark;
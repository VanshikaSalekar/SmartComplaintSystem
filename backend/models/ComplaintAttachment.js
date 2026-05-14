// backend/models/ComplaintAttachment.js

import mongoose from "mongoose";

const complaintAttachmentSchema = new mongoose.Schema(
  {
    complaint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      enum: ["image", "pdf", "video", "other"],
      default: "image",
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ComplaintAttachment = mongoose.model(
  "ComplaintAttachment",
  complaintAttachmentSchema
);

export default ComplaintAttachment;
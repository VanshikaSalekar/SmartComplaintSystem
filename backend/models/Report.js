// backend/models/Report.js

import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    reportType: {
      type: String,
      enum: ["daily", "weekly", "monthly", "custom"],
      default: "monthly",
    },

    fromDate: {
      type: Date,
      required: true,
    },

    toDate: {
      type: Date,
      required: true,
    },

    totalComplaints: {
      type: Number,
      default: 0,
    },

    pendingCount: {
      type: Number,
      default: 0,
    },

    inProgressCount: {
      type: Number,
      default: 0,
    },

    resolvedCount: {
      type: Number,
      default: 0,
    },

    rejectedCount: {
      type: Number,
      default: 0,
    },

    mostProblematicCategory: {
      type: String,
      default: null,
    },

    mostProblematicLocation: {
      type: String,
      default: null,
    },

    avgResolutionHours: {
      type: Number,
      default: 0,
    },

    departmentPerformance: {
      type: Array,
      default: [],
    },

    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    categoryStats: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;
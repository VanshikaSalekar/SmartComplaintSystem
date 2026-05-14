// backend/models/Priority.js

import mongoose from "mongoose";

const prioritySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    level: {
      type: Number,
      required: true, // 1 = Low, 2 = Medium, 3 = High, 4 = Emergency
    },

    description: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "#000000",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Priority = mongoose.model("Priority", prioritySchema);

export default Priority;
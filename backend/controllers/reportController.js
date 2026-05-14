import Complaint from "../models/Complaint.js";
import Report from "../models/Report.js";

export const generateReport = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;

    let filter = {};

    if (fromDate || toDate) {
      filter.createdAt = {};
      if (fromDate) filter.createdAt.$gte = new Date(fromDate);
      if (toDate) filter.createdAt.$lte = new Date(toDate);
    }

    const totalComplaints = await Complaint.countDocuments(filter);

    const pendingCount = await Complaint.countDocuments({
      ...filter,
      status: "Pending",
    });

    const inProgressCount = await Complaint.countDocuments({
      ...filter,
      status: "In Progress",
    });

    const resolvedCount = await Complaint.countDocuments({
      ...filter,
      status: "Resolved",
    });

    const rejectedCount = await Complaint.countDocuments({
      ...filter,
      status: "Rejected",
    });

    const mostProblematicCategoryAgg = await Complaint.aggregate([
      { $match: { ...filter, category: { $ne: null, $ne: "" } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    const mostProblematicCategory =
      mostProblematicCategoryAgg.length > 0
        ? mostProblematicCategoryAgg[0]._id
        : null;

    const mostProblematicLocationAgg = await Complaint.aggregate([
      { $match: { ...filter, location: { $ne: null, $ne: "" } } },
      {
        $addFields: {
          mainLocation: {
            $trim: {
              input: { $arrayElemAt: [{ $split: ["$location", "-"] }, 0] },
            },
          },
        },
      },
      { $group: { _id: "$mainLocation", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    const mostProblematicLocation =
      mostProblematicLocationAgg.length > 0
        ? mostProblematicLocationAgg[0]._id
        : null;

    const departmentPerformance = await Complaint.aggregate([
      { $match: { ...filter, department: { $ne: null, $ne: "" } } },
      { $group: { _id: "$department", totalComplaints: { $sum: 1 } } },
      { $sort: { totalComplaints: -1 } },
    ]);

    const resolvedComplaints = await Complaint.find({
      ...filter,
      status: "Resolved",
    }).select("createdAt updatedAt");

    let avgResolutionHours = 0;

    if (resolvedComplaints.length > 0) {
      const totalHours = resolvedComplaints.reduce((sum, c) => {
        const diffMs = new Date(c.updatedAt) - new Date(c.createdAt);
        return sum + diffMs / (1000 * 60 * 60);
      }, 0);

      avgResolutionHours = totalHours / resolvedComplaints.length;
    }

    const categories = [
      "Water",
      "Electricity",
      "Internet",
      "Cleanliness",
      "Maintenance",
    ];

    let categoryStats = {};

    for (let cat of categories) {
      categoryStats[cat] = await Complaint.countDocuments({
        ...filter,
        category: cat,
      });
    }

    return res.json({
      total: totalComplaints,
      pending: pendingCount,
      inProgress: inProgressCount,
      resolved: resolvedCount,
      rejected: rejectedCount,

      categoryStats,

      mostProblematicCategory,
      mostProblematicLocation,
      avgResolutionHours: Number(avgResolutionHours.toFixed(2)),
      departmentPerformance,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate report" });
  }
};
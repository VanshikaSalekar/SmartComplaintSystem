// backend/seed.js

import dotenv from "dotenv";
import connectDB from "./config/db.js";

import User from "./models/User.js";
import Category from "./models/Category.js";
import Department from "./models/Department.js";
import Status from "./models/Status.js";
import Priority from "./models/Priority.js";
import Location from "./models/Location.js";

import Complaint from "./models/Complaint.js";
import ComplaintHistory from "./models/ComplaintHistory.js";
import ComplaintAttachment from "./models/ComplaintAttachment.js";
import ComplaintRemark from "./models/ComplaintRemark.js";
import Notification from "./models/Notification.js";
import Report from "./models/Report.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("Seeding Database Started...");

    // Clear all collections
    await User.deleteMany({});
    await Category.deleteMany({});
    await Department.deleteMany({});
    await Status.deleteMany({});
    await Priority.deleteMany({});
    await Location.deleteMany({});
    await Complaint.deleteMany({});
    await ComplaintHistory.deleteMany({});
    await ComplaintAttachment.deleteMany({});
    await ComplaintRemark.deleteMany({});
    await Notification.deleteMany({});
    await Report.deleteMany({});

    console.log("Old Data Deleted Successfully...");

    // Create Admin + Users
    const admin = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
      phone: "9999999999",
    });

    const user1 = await User.create({
      name: "Student One",
      email: "student1@gmail.com",
      password: "student123",
      role: "user",
      phone: "8888888888",
      hostelBlock: "Hostel A",
      roomNo: "101",
    });

    const user2 = await User.create({
      name: "Student Two",
      email: "student2@gmail.com",
      password: "student123",
      role: "user",
      phone: "7777777777",
      hostelBlock: "Hostel B",
      roomNo: "202",
    });

    const user3 = await User.create({
      name: "Student Three",
      email: "student3@gmail.com",
      password: "student123",
      role: "user",
      phone: "6666666666",
      hostelBlock: "Hostel C",
      roomNo: "303",
    });

    // Insert Categories
    await Category.insertMany([
      { name: "Water", description: "Water leakage, shortage, pipeline issues" },
      {
        name: "Electricity",
        description: "Power cut, fan/light, wiring problems",
      },
      { name: "Internet", description: "WiFi connectivity and speed issues" },
      {
        name: "Cleanliness",
        description: "Garbage disposal and hygiene problems",
      },
      {
        name: "Maintenance",
        description: "Furniture repair, building maintenance issues",
      },
      { name: "Security", description: "Security related issues (future upgrade)" },
      { name: "Food", description: "Mess / canteen food issues (future upgrade)" },
    ]);

    // Insert Departments
    await Department.insertMany([
      { name: "Plumbing", description: "Handles water and pipeline related work" },
      { name: "Electrical", description: "Handles electricity and wiring work" },
      { name: "IT", description: "Handles WiFi and internet connectivity issues" },
      { name: "Cleaning", description: "Handles cleanliness and sanitation" },
      { name: "Maintenance", description: "Handles repairs and maintenance tasks" },
      { name: "Security", description: "Handles security-related issues (future upgrade)" },
      { name: "Mess Department", description: "Handles food/mess issues (future upgrade)" },
    ]);

    // Insert Statuses
    await Status.insertMany([
      {
        name: "Pending",
        description: "Complaint submitted, waiting for action",
        color: "yellow",
      },
      {
        name: "In Progress",
        description: "Complaint assigned and being resolved",
        color: "blue",
      },
      {
        name: "Resolved",
        description: "Complaint solved successfully",
        color: "green",
      },
      {
        name: "Rejected",
        description: "Complaint rejected due to invalid reason",
        color: "red",
      },
      {
        name: "Reopened",
        description: "Complaint reopened after resolution",
        color: "orange",
      },
    ]);

    // Insert Priorities
    await Priority.insertMany([
      { name: "Low", level: 1, description: "Not urgent issue", color: "gray" },
      { name: "Medium", level: 2, description: "Normal priority issue", color: "blue" },
      { name: "High", level: 3, description: "Needs quick action", color: "orange" },
      { name: "Emergency", level: 4, description: "Critical complaint", color: "red" },
    ]);

    // Insert Locations
    await Location.insertMany([
      { name: "Hostel A", type: "Hostel" },
      { name: "Hostel B", type: "Hostel" },
      { name: "Hostel C", type: "Hostel" },
      { name: "Hostel D", type: "Hostel" },
      { name: "Main Building", type: "Building" },
      { name: "Library", type: "Building" },
      { name: "Computer Lab", type: "Building" },
      { name: "Classroom Block A", type: "Block" },
      { name: "Classroom Block B", type: "Block" },
      { name: "Canteen", type: "Area" },
      { name: "Parking Area", type: "Area" },
      { name: "Playground", type: "Area" },
    ]);

    console.log("Master Data Inserted Successfully...");

    // Create Complaints (MORE DATA FOR ANALYTICS)
    const complaints = await Complaint.insertMany([
      {
        complaintId: "SCM1001",
        user: user1._id,
        category: "Water",
        description: "Water leakage in washroom area.",
        location: "Hostel A - Room 101",
        department: "Plumbing",
        status: "Pending",
        remarks: "",
      },
      {
        complaintId: "SCM1002",
        user: user2._id,
        category: "Internet",
        description: "WiFi is not working in Hostel B.",
        location: "Hostel B - Room 202",
        department: "IT",
        status: "In Progress",
        remarks: "Team assigned, working on issue.",
      },
      {
        complaintId: "SCM1003",
        user: user1._id,
        category: "Electricity",
        description: "Fan not working properly.",
        location: "Hostel A - Room 101",
        department: "Electrical",
        status: "Resolved",
        remarks: "Fan replaced successfully.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
      },
      {
        complaintId: "SCM1004",
        user: user3._id,
        category: "Cleanliness",
        description: "Garbage not collected in Hostel C.",
        location: "Hostel C - Floor 1",
        department: "Cleaning",
        status: "Resolved",
        remarks: "Cleaning staff cleared garbage.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
      },
      {
        complaintId: "SCM1005",
        user: user2._id,
        category: "Water",
        description: "No water supply in Hostel A washroom.",
        location: "Hostel A - Washroom",
        department: "Plumbing",
        status: "In Progress",
        remarks: "Checking pipeline issue.",
      },
      {
        complaintId: "SCM1006",
        user: user1._id,
        category: "Water",
        description: "Tap broken in Hostel A.",
        location: "Hostel A - Room 110",
        department: "Plumbing",
        status: "Resolved",
        remarks: "Tap replaced successfully.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
      },
      {
        complaintId: "SCM1007",
        user: user3._id,
        category: "Internet",
        description: "WiFi slow in Computer Lab.",
        location: "Computer Lab",
        department: "IT",
        status: "Pending",
        remarks: "",
      },
      {
        complaintId: "SCM1008",
        user: user2._id,
        category: "Maintenance",
        description: "Broken chair in classroom.",
        location: "Classroom Block A",
        department: "Maintenance",
        status: "Resolved",
        remarks: "Chair repaired successfully.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11),
      },
      {
        complaintId: "SCM1009",
        user: user1._id,
        category: "Electricity",
        description: "Light flickering in corridor.",
        location: "Hostel A - Corridor",
        department: "Electrical",
        status: "Rejected",
        remarks: "Issue not found during inspection.",
      },
      {
        complaintId: "SCM1010",
        user: user3._id,
        category: "Cleanliness",
        description: "Washroom dirty and smelly.",
        location: "Hostel B - Washroom",
        department: "Cleaning",
        status: "In Progress",
        remarks: "Cleaning scheduled.",
      },
      {
        complaintId: "SCM1011",
        user: user2._id,
        category: "Maintenance",
        description: "Door lock broken.",
        location: "Hostel B - Room 205",
        department: "Maintenance",
        status: "Pending",
        remarks: "",
      },
      {
        complaintId: "SCM1012",
        user: user1._id,
        category: "Water",
        description: "Water overflow near hostel gate.",
        location: "Hostel A - Gate",
        department: "Plumbing",
        status: "Resolved",
        remarks: "Overflow fixed.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
      },
    ]);

    console.log("Complaints Inserted Successfully...");

    // Complaint History Auto Creation
    const histories = [];

    complaints.forEach((c) => {
      histories.push({
        complaint: c._id,
        oldStatus: "",
        newStatus: "Pending",
        remark: "Complaint created",
        changedBy: c.user,
        department: c.department,
        changedAt: c.createdAt || new Date(),
      });

      if (c.status !== "Pending") {
        histories.push({
          complaint: c._id,
          oldStatus: "Pending",
          newStatus: c.status,
          remark: c.remarks || "Status updated",
          changedBy: admin._id,
          department: c.department,
          changedAt: c.updatedAt || new Date(),
        });
      }
    });

    await ComplaintHistory.insertMany(histories);

    console.log("Complaint History Inserted Successfully...");

    // Complaint Remarks (dummy)
    await ComplaintRemark.insertMany([
      {
        complaint: complaints[1]._id,
        remark: "Technician assigned to check router.",
        addedBy: admin._id,
        isInternal: true,
      },
      {
        complaint: complaints[2]._id,
        remark: "Issue solved quickly.",
        addedBy: admin._id,
        isInternal: false,
      },
    ]);

    // Complaint Attachments (dummy)
    await ComplaintAttachment.insertMany([
      {
        complaint: complaints[0]._id,
        fileUrl: "uploads/sample-water.jpg",
        fileType: "image",
        uploadedBy: user1._id,
      },
      {
        complaint: complaints[1]._id,
        fileUrl: "uploads/sample-wifi.jpg",
        fileType: "image",
        uploadedBy: user2._id,
      },
    ]);

    // Notifications (dummy)
    await Notification.insertMany([
      {
        user: user1._id,
        complaint: complaints[0]._id,
        title: "Complaint Submitted",
        message: "Your water complaint has been registered successfully.",
        type: "info",
      },
      {
        user: user2._id,
        complaint: complaints[1]._id,
        title: "Complaint Status Updated",
        message: "Your complaint status changed to In Progress.",
        type: "success",
      },
    ]);

    // Create Smart Analytics Demo Report
    await Report.create({
      title: "Monthly Complaint Report (Demo)",
      reportType: "monthly",
      fromDate: new Date("2026-01-01"),
      toDate: new Date(),
      totalComplaints: complaints.length,
      pendingCount: complaints.filter((c) => c.status === "Pending").length,
      inProgressCount: complaints.filter((c) => c.status === "In Progress").length,
      resolvedCount: complaints.filter((c) => c.status === "Resolved").length,
      rejectedCount: complaints.filter((c) => c.status === "Rejected").length,
      categoryStats: {
        Water: complaints.filter((c) => c.category === "Water").length,
        Electricity: complaints.filter((c) => c.category === "Electricity").length,
        Internet: complaints.filter((c) => c.category === "Internet").length,
        Cleanliness: complaints.filter((c) => c.category === "Cleanliness").length,
        Maintenance: complaints.filter((c) => c.category === "Maintenance").length,
      },
      mostProblematicCategory: "Water",
      mostProblematicLocation: "Hostel A",
      avgResolutionHours: 32,
      departmentPerformance: [
        { _id: "Plumbing", totalComplaints: 4 },
        { _id: "IT", totalComplaints: 2 },
        { _id: "Cleaning", totalComplaints: 2 },
        { _id: "Electrical", totalComplaints: 2 },
        { _id: "Maintenance", totalComplaints: 2 },
      ],
      generatedBy: admin._id,
    });

    console.log("Smart Report Inserted Successfully...");

    console.log("\n✅ Database Seeded Successfully with FULL SMART DATA!");
    console.log("Admin Login: admin@gmail.com / admin123");
    console.log("User Login: student1@gmail.com / student123");
    console.log("User Login: student2@gmail.com / student123");
    console.log("User Login: student3@gmail.com / student123\n");

    process.exit();
  } catch (error) {
    console.error("Seeding Failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();
// frontend/src/services/adminService.js

import api from "./api";

// Get all complaints (Admin)
export const getAllComplaints = async (filters = {}) => {
  const { status, category, fromDate, toDate } = filters;

  const params = {};
  if (status) params.status = status;
  if (category) params.category = category;
  if (fromDate) params.fromDate = fromDate;
  if (toDate) params.toDate = toDate;

  const res = await api.get("/admin/complaints", { params });
  return res.data;
};

// Get single complaint details (Admin)
export const getComplaintByIdAdmin = async (id) => {
  const res = await api.get(`/admin/complaints/${id}`);
  return res.data;
};

// Update complaint status / department / remarks (Admin)
export const updateComplaintAdmin = async (id, updateData) => {
  const res = await api.patch(`/admin/complaints/${id}`, updateData);
  return res.data;
};

// Get reports data (Admin)
export const getReports = async () => {
  const res = await api.get("/admin/reports");
  return res.data;
};
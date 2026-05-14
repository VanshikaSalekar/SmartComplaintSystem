// frontend/src/services/complaintService.js

import api from "./api";

// Create Complaint (User)
export const createComplaint = async (formData) => {
  const res = await api.post("/complaints", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// Get My Complaints (User)
export const getMyComplaints = async () => {
  const res = await api.get("/complaints/my");
  return res.data;
};

// Get Complaint Details (User)
export const getComplaintById = async (id) => {
  const res = await api.get(`/complaints/${id}`);
  return res.data;
};

// Get Complaint History (User/Admin)
export const getComplaintHistory = async (complaintId) => {
  const res = await api.get(`/history/${complaintId}`);
  return res.data;
};
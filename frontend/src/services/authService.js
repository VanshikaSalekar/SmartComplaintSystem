// frontend/src/services/authService.js

import api from "./api";

// Register user
export const registerUser = async (formData) => {
  const res = await api.post("/auth/register", formData);
  return res.data;
};

// Login user
export const loginUser = async (formData) => {
  const res = await api.post("/auth/login", formData);
  return res.data;
};

// Get current logged-in user
export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
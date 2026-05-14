// frontend/src/services/api.js

import axios from "axios";

const api = axios.create({
  baseURL: "https://smartcomplaintsystem-h2u5.onrender.com",
});

// Automatically attach token in every request
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
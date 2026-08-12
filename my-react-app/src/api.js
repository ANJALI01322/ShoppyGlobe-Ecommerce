import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:1900/api",
  withCredentials: true, // 🔥 REQUIRED FOR AUTH COOKIES
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

// Optional helper
export const updateCartQuantity = (productId, qty) =>
  api.put(`/cart/${productId}`, { quantity: qty });











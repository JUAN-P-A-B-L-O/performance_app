import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Futuro:
 * http.interceptors.request.use(...)
 * http.interceptors.response.use(...)
 */

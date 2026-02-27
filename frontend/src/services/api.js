import axios from "axios";

let baseURL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

// Ensure the baseURL points to the /api/ prefix
if (!baseURL.endsWith("/api") && !baseURL.endsWith("/api/")) {
  baseURL = baseURL.replace(/\/+$/, "") + "/api/";
} else if (!baseURL.endsWith("/")) {
  baseURL += "/";
}

const API = axios.create({
  baseURL: baseURL,
});

// Attach JWT token to every request
API.interceptors.request.use(config => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-logout on 401 Unauthorized
API.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("username");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;

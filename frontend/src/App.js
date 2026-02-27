/*
Task Management System - Django Backend Configuration

Designed & Developed by Sakthiram
© 2026 Sakthiram. All Rights Reserved.

Production-ready settings for Railway deployment with
JWT Authentication, MySQL (Production), SQLite (Development),
CORS configuration, and secure environment handling.
*/

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import "./App.css";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("access");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  // Initialize theme from localStorage on first load
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="container app-container">
        <Routes>
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
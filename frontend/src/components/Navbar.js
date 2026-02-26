import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("access");
  const username = localStorage.getItem("username") || "User";
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="app-navbar px-4 py-2 d-flex align-items-center justify-content-between">
      <Link to="/" className="navbar-brand-custom d-flex align-items-center gap-2 text-decoration-none">
        <span className="brand-icon">✅</span>
        <span className="brand-text fw-bold fs-5">Smart To-Do</span>
      </Link>
      <div className="d-flex align-items-center gap-3">
        <button
          className="btn btn-sm theme-toggle"
          onClick={() => setDark(d => !d)}
          title="Toggle dark mode"
        >
          {dark ? "☀️" : "🌙"}
        </button>
        {isAuthenticated ? (
          <>
            <span className="nav-username">👤 {username}</span>
            <button className="btn btn-sm btn-outline-danger fw-semibold" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-sm btn-outline-light fw-semibold">Login</Link>
            <Link to="/register" className="btn btn-sm btn-primary fw-semibold">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
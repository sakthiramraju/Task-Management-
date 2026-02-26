import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("access");
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand fw-bold">Smart To-Do</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {isAuthenticated ? (
            <li className="nav-item">
              <button className="nav-link btn btn-link text-white"
                onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
              <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
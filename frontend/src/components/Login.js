/*
Task Management System - Django Backend Configuration

Designed & Developed by Sakthiram
© 2026 Sakthiram. All Rights Reserved.

Production-ready settings for Railway deployment with
JWT Authentication, MySQL (Production), SQLite (Development),
CORS configuration, and secure environment handling.
*/

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import Alert from "./Alert";
import Loader from "./Loader";

export default function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ msg: "", type: "" });
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setAlert({ msg: "", type: "" });
    try {
      const res = await API.post("login/", credentials);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      // Store username for display in Navbar
      localStorage.setItem("username", credentials.username);
      setAlert({ msg: "Logged in. Redirecting...", type: "success" });
      setTimeout(() => navigate("/"), 700);
    } catch (error) {
      setAlert({
        msg:
          (error.response && error.response.data.detail) ||
          "Login failed. Check credentials.",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-5 mx-auto my-5">
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <div className="text-center mb-4">
          <div className="fs-1 mb-2">✅</div>
          <h2 className="fw-bold">Welcome Back</h2>
          <p className="text-muted">Sign in to your Smart To-Do account</p>
        </div>
        <Alert message={alert.msg} type={alert.type} onClose={() => setAlert({ msg: "", type: "" })} />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input className="form-control form-control-lg" type="text" name="username" required onChange={handleChange} placeholder="Enter username" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input className="form-control form-control-lg" type="password" name="password" required onChange={handleChange} placeholder="Enter password" />
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold mt-2" disabled={loading}>
            {loading ? <Loader /> : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          New user? <Link to="/register" className="fw-semibold">Register here</Link>
        </div>
      </div>
    </div>
  );
}
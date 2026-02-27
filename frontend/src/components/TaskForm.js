/*
Task Management System - Django Backend Configuration

Designed & Developed by Sakthiram
© 2026 Sakthiram. All Rights Reserved.

Production-ready settings for Railway deployment with
JWT Authentication, MySQL (Production), SQLite (Development),
CORS configuration, and secure environment handling.
*/

import React, { useState } from "react";
import API from "../services/api";
import Loader from "./Loader";
import Alert from "./Alert";

export default function TaskForm({ onTaskAdd }) {
  const [form, setForm] = useState({ title: "", description: "", priority: "Medium", due_date: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ msg: "", type: "" });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setAlert({ msg: "", type: "" });
    try {
      const res = await API.post("tasks/", form);
      onTaskAdd(res.data);
      setForm({ title: "", description: "", priority: "Medium", due_date: "" });
    } catch (error) {
      const errMsg =
        (error.response && Object.values(error.response.data)[0]) ||
        "Failed to add task. Please try again.";
      setAlert({ msg: errMsg, type: "danger" });
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="card border-0 shadow-sm rounded-4 p-4 mb-4">
      <h5 className="fw-bold mb-3">➕ Add New Task</h5>
      <Alert message={alert.msg} type={alert.type} onClose={() => setAlert({ msg: "", type: "" })} />
      <div className="row g-2">
        <div className="col-md-6 mb-2">
          <input
            className="form-control"
            placeholder="Task title *"
            required
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 mb-2">
          <input
            className="form-control"
            type="date"
            required
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-7 mb-2">
          <input
            className="form-control"
            placeholder="Description (optional)"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-5 mb-2">
          <select className="form-select" name="priority" value={form.priority} onChange={handleChange}>
            <option value="Low">🟢 Low Priority</option>
            <option value="Medium">🟡 Medium Priority</option>
            <option value="High">🔴 High Priority</option>
          </select>
        </div>
      </div>
      <button className="btn btn-primary fw-bold mt-2" type="submit" disabled={loading}>
        {loading ? <Loader /> : "Add Task"}
      </button>
    </form>
  );
}
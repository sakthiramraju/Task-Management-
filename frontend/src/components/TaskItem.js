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

export default function TaskItem({ task, onTaskUpdate, onTaskDelete }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...task });
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [alert, setAlert] = useState({ msg: "", type: "" });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function saveEdit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.put(`tasks/${task.id}/`, form);
      setEditing(false);
      onTaskUpdate(res.data);
    } catch {
      setAlert({ msg: "Failed to save task.", type: "danger" });
    } finally {
      setLoading(false);
    }
  }

  async function toggleComplete() {
    setLoading(true);
    try {
      const res = await API.patch(`tasks/${task.id}/`, { is_completed: !task.is_completed });
      onTaskUpdate(res.data);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTask() {
    setLoading(true);
    try {
      await API.delete(`tasks/${task.id}/`);
      onTaskDelete(task.id);
    } finally {
      setLoading(false);
    }
  }

  // Due date logic
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = task.due_date ? new Date(task.due_date) : null;
  const isOverdue = dueDate && dueDate < today && !task.is_completed;
  const isDueToday = dueDate && dueDate.getTime() === today.getTime();

  const dueBadgeClass = isOverdue
    ? "badge-due-overdue"
    : isDueToday
      ? "badge-due-today"
      : "badge-due-future";

  const dueDateEmoji = isOverdue ? "🔴" : isDueToday ? "🟡" : "🟢";

  const priorityBadgeClass =
    task.priority === "High"
      ? "badge-priority-high"
      : task.priority === "Medium"
        ? "badge-priority-medium"
        : "badge-priority-low";

  if (editing) {
    return (
      <form className="task-card task-card-editing mb-3" onSubmit={saveEdit}>
        <Alert message={alert.msg} type={alert.type} onClose={() => setAlert({ msg: "", type: "" })} />
        <div className="row g-2">
          <div className="col-12 col-md-4">
            <input name="title" className="form-control" value={form.title} onChange={handleChange} required placeholder="Task title" />
          </div>
          <div className="col-12 col-md-3">
            <input name="due_date" type="date" className="form-control" value={form.due_date} onChange={handleChange} required />
          </div>
          <div className="col-12 col-md-2">
            <select name="priority" className="form-select" value={form.priority} onChange={handleChange}>
              <option value="Low">🟢 Low</option>
              <option value="Medium">🟡 Medium</option>
              <option value="High">🔴 High</option>
            </select>
          </div>
          <div className="col-12 col-md-3 d-flex align-items-center gap-2">
            <button className="btn btn-success btn-sm fw-semibold" type="submit" disabled={loading}>
              {loading ? <Loader /> : "💾 Save"}
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => setEditing(false)} type="button">Cancel</button>
          </div>
        </div>
        <div className="mt-2">
          <textarea name="description" className="form-control" value={form.description || ""} onChange={handleChange} placeholder="Description (optional)" rows={2} />
        </div>
      </form>
    );
  }

  return (
    <div className={`task-card mb-3 ${task.is_completed ? "task-completed" : ""} ${isOverdue ? "task-overdue" : ""}`}>
      <Alert message={alert.msg} type={alert.type} onClose={() => setAlert({ msg: "", type: "" })} />

      {/* Confirm Delete Panel */}
      {confirmDelete && (
        <div className="confirm-delete-bar d-flex align-items-center gap-2 mb-2 p-2 rounded-3">
          <span className="fw-semibold">⚠️ Delete this task?</span>
          <button className="btn btn-danger btn-sm" onClick={deleteTask} disabled={loading}>
            {loading ? <Loader /> : "Yes, Delete"}
          </button>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => setConfirmDelete(false)}>Cancel</button>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div className="flex-grow-1">
          <div className="d-flex align-items-center flex-wrap gap-2 mb-1">
            <h5 className={`task-title mb-0 ${task.is_completed ? "task-title-done" : ""}`}>
              {task.title}
            </h5>
            {isOverdue && <span className="badge badge-overdue-label">Overdue</span>}
          </div>
          <div className="d-flex flex-wrap gap-2 mt-1">
            <span className={`badge-custom ${priorityBadgeClass}`}>{task.priority}</span>
            <span className={`badge-custom ${dueBadgeClass}`}>
              {dueDateEmoji} {task.due_date}
            </span>
            <span className={`badge-custom ${task.is_completed ? "badge-status-done" : "badge-status-pending"}`}>
              {task.is_completed ? "✅ Completed" : "⏳ Pending"}
            </span>
          </div>
          {task.description && (
            <p className="task-description mt-2 mb-0">{task.description}</p>
          )}
        </div>
        <div className="d-flex align-items-center gap-2 flex-shrink-0">
          <button
            className={`btn btn-sm ${task.is_completed ? "btn-outline-secondary" : "btn-success"} fw-semibold`}
            onClick={toggleComplete}
            disabled={loading}
          >
            {task.is_completed ? "↩ Undo" : "✓ Done"}
          </button>
          <button className="btn btn-sm btn-outline-primary fw-semibold" onClick={() => setEditing(true)} disabled={loading}>
            ✏️
          </button>
          <button className="btn btn-sm btn-outline-danger fw-semibold" onClick={() => setConfirmDelete(true)} disabled={loading}>
            🗑️
          </button>
          {loading && <Loader />}
        </div>
      </div>
    </div>
  );
}
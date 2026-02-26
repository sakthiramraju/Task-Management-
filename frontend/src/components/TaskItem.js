import React, { useState } from "react";
import API from "../services/api";
import Loader from "./Loader";

export default function TaskItem({ task, onTaskUpdate, onTaskDelete }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...task });
  const [loading, setLoading] = useState(false);

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
    if (!window.confirm("Delete this task?")) return;
    setLoading(true);
    try {
      await API.delete(`tasks/${task.id}/`);
      onTaskDelete(task.id);
    } finally {
      setLoading(false);
    }
  }

  if (editing) {
    return (
      <form className="card card-body mb-2" onSubmit={saveEdit}>
        <div className="row g-2">
          <div className="col-12 col-md-4">
            <input name="title" className="form-control" value={form.title} onChange={handleChange} required />
          </div>
          <div className="col-12 col-md-3">
            <input name="due_date" type="date" className="form-control" value={form.due_date} onChange={handleChange} required />
          </div>
          <div className="col-12 col-md-2">
            <select name="priority" className="form-select" value={form.priority} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="col-12 col-md-3 d-flex align-items-center gap-2">
            <button className="btn btn-success btn-sm" type="submit" disabled={loading}>
              {loading ? <Loader /> : "Save"}
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => setEditing(false)} type="button">Cancel</button>
          </div>
        </div>
        <div className="mt-2">
          <textarea name="description" className="form-control" value={form.description || ""} onChange={handleChange} placeholder="Description" />
        </div>
      </form>
    );
  }

  return (
    <div className={`card card-body mb-2 ${task.is_completed ? "border-success" : ""}`}>
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <div>
          <h5 style={{ textDecoration: task.is_completed ? "line-through" : "" }}>
            {task.title}
          </h5>
          <span className={`badge ms-2 ${task.priority === "High" ? "bg-danger" : task.priority === "Medium" ? "bg-warning text-dark" : "bg-info"}`}>
            {task.priority}
          </span>
          <span className="badge bg-dark ms-2">{task.due_date}</span>
          <span className={`badge ms-2 ${task.is_completed ? "bg-success" : "bg-secondary"}`}>
            {task.is_completed ? "Completed" : "Pending"}
          </span>
          {task.description && <div className="mt-2 text-muted">{task.description}</div>}
        </div>
        <div className="d-flex align-items-center gap-1 mt-3 mt-md-0">
          <button className={`btn btn-${task.is_completed ? "secondary" : "success"} btn-sm`}
            onClick={toggleComplete} disabled={loading}>
            {task.is_completed ? "Mark Pending" : "Complete"}
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setEditing(true)} disabled={loading}>Edit</button>
          <button className="btn btn-danger btn-sm" onClick={deleteTask} disabled={loading}>Delete</button>
          {loading && <Loader />}
        </div>
      </div>
    </div>
  );
}
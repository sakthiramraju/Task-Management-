import React, { useState } from "react";
import API from "../services/api";
import Loader from "./Loader";

export default function TaskForm({ onTaskAdd }) {
  const [form, setForm] = useState({ title: "", description: "", priority: "Medium", due_date: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("tasks/", form);
      onTaskAdd(res.data);
      setForm({ title: "", description: "", priority: "Medium", due_date: "" });
    } catch {
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="card card-body mb-4 shadow">
      <h4 className="mb-2">Add New Task</h4>
      <div className="row g-2">
        <div className="col-md-6 mb-2">
          <input
            className="form-control"
            placeholder="Title*"
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
            placeholder="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-5 mb-2">
          <select
            className="form-select"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
      <button className="btn btn-primary mt-2" type="submit" disabled={loading}>
        {loading ? <Loader /> : "Add Task"}
      </button>
    </form>
  );
}
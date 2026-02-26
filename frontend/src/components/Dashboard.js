import React, { useState, useEffect } from "react";
import API from "../services/api";
import Loader from "./Loader";
import Alert from "./Alert";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [alert, setAlert] = useState({ msg: "", type: "" });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "all", priority: "all", q: "" });
  const [summary, setSummary] = useState({ total: 0, completed: 0, pending: 0 });

  const fetchTasks = async () => {
    setLoading(true);
    let url = `tasks/?ordering=due_date`;
    if (filters.status !== "all") url += `&status=${filters.status}`;
    if (filters.priority !== "all") url += `&priority=${filters.priority}`;
    if (filters.q) url += `&search=${filters.q}`;
    try {
      const res = await API.get(url);
      const list = res.data.results || res.data;
      setTasks(list);
      summarize(list);
    } catch {
      setAlert({ msg: "Failed to fetch tasks. Please login again.", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const summarize = (list) => {
    const total = list.length;
    const completed = list.filter(task => task.is_completed).length;
    setSummary({ total, completed, pending: total - completed });
  };

  useEffect(() => { fetchTasks(); /* eslint-disable-next-line */ }, [filters]);

  const handleAddTask = newTask => {
    const updated = [newTask, ...tasks];
    setTasks(updated);
    summarize(updated);
    setAlert({ msg: "✅ Task added successfully!", type: "success" });
  };

  const handleUpdateTask = updatedTask => {
    const updated = tasks.map(t => (t.id === updatedTask.id ? updatedTask : t));
    setTasks(updated);
    summarize(updated);
    setAlert({ msg: "✏️ Task updated!", type: "success" });
  };

  const handleDeleteTask = id => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    summarize(updated);
    setAlert({ msg: "🗑️ Task deleted.", type: "info" });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const progressPercent = summary.total > 0 ? Math.round((summary.completed / summary.total) * 100) : 0;

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between my-3 flex-wrap gap-2">
        <h2 className="fw-bold mb-0">📋 My Tasks</h2>
        <span className="text-muted fs-6">{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
      </div>

      <Alert message={alert.msg} type={alert.type} onClose={() => setAlert({ msg: "", type: "" })} />

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-4">
          <div className="stat-card stat-total">
            <div className="stat-number">{summary.total}</div>
            <div className="stat-label">Total</div>
          </div>
        </div>
        <div className="col-4">
          <div className="stat-card stat-completed">
            <div className="stat-number">{summary.completed}</div>
            <div className="stat-label">Done</div>
          </div>
        </div>
        <div className="col-4">
          <div className="stat-card stat-pending">
            <div className="stat-number">{summary.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {summary.total > 0 && (
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <small className="fw-semibold text-muted">Progress</small>
            <small className="fw-semibold text-muted">{summary.completed}/{summary.total} tasks — {progressPercent}%</small>
          </div>
          <div className="progress" style={{ height: "10px", borderRadius: "10px" }}>
            <div
              className={`progress-bar ${progressPercent === 100 ? "bg-success" : "progress-bar-animated progress-bar-striped"}`}
              style={{ width: `${progressPercent}%`, borderRadius: "10px" }}
            />
          </div>
        </div>
      )}

      <div className="row mb-4">
        <div className="col-lg-6 mb-3">
          <TaskForm onTaskAdd={handleAddTask} />
        </div>
        <div className="col-lg-6">
          {/* Filters */}
          <div className="card border-0 shadow-sm rounded-4 p-3 mb-3">
            <h6 className="fw-bold mb-2">🔍 Filter & Search</h6>
            <div className="d-flex flex-wrap gap-2">
              <input
                className="form-control flex-grow-1"
                style={{ minWidth: 130 }}
                placeholder="Search tasks..."
                name="q"
                value={filters.q}
                onChange={handleFilterChange}
              />
              <select className="form-select w-auto" name="status" onChange={handleFilterChange}>
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <select className="form-select w-auto" name="priority" onChange={handleFilterChange}>
                <option value="all">All Priorities</option>
                <option value="High">🔴 High</option>
                <option value="Medium">🟡 Medium</option>
                <option value="Low">🟢 Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? <Loader /> : (
        tasks.length === 0 ? (
          <div className="empty-state text-center py-5">
            <div className="empty-icon">📭</div>
            <h4 className="fw-bold mt-3">No tasks found</h4>
            <p className="text-muted">Add your first task using the form above!</p>
          </div>
        ) : (
          <TaskList tasks={tasks} onTaskUpdate={handleUpdateTask} onTaskDelete={handleDeleteTask} />
        )
      )}
    </div>
  );
}
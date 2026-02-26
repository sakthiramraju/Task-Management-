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
      setTasks(res.data.results || res.data); // pagination support
      summarize(res.data.results || res.data);
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
    setTasks([newTask, ...tasks]);
    summarize([newTask, ...tasks]);
    setAlert({ msg: "Task added!", type: "success" });
  };

  const handleUpdateTask = updatedTask => {
    let updated = tasks.map(t => (t.id === updatedTask.id ? updatedTask : t));
    setTasks(updated);
    summarize(updated);
    setAlert({ msg: "Task updated!", type: "success" });
  };

  const handleDeleteTask = id => {
    let updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    summarize(updated);
    setAlert({ msg: "Task deleted.", type: "info" });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="fw-bold my-3">Dashboard</h2>
      <Alert message={alert.msg} type={alert.type} onClose={() => setAlert({ msg: "", type: "" })} />
      <div className="row mb-4">
        <div className="col-lg-6 mb-2">
          <TaskForm onTaskAdd={handleAddTask} />
        </div>
        <div className="col-lg-6">
          <div className="mb-3 d-flex flex-wrap gap-2">
            <input
              className="form-control"
              style={{ maxWidth: 180 }}
              placeholder="Search..."
              name="q"
              value={filters.q}
              onChange={handleFilterChange}
            />
            <select className="form-select w-auto" name="status" onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <select className="form-select w-auto" name="priority" onChange={handleFilterChange}>
              <option value="all">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="row mb-3">
            <div className="col">
              <div className="card text-white bg-secondary mb-2">
                <div className="card-body"><strong>Total:</strong> {summary.total}</div>
              </div>
            </div>
            <div className="col">
              <div className="card text-white bg-success mb-2">
                <div className="card-body"><strong>Completed:</strong> {summary.completed}</div>
              </div>
            </div>
            <div className="col">
              <div className="card text-white bg-warning mb-2">
                <div className="card-body"><strong>Pending:</strong> {summary.pending}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading ? <Loader /> :
        <TaskList
          tasks={tasks}
          onTaskUpdate={handleUpdateTask}
          onTaskDelete={handleDeleteTask}
        />
      }
    </div>
  );
}
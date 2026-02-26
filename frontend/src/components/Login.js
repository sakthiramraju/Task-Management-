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
    <div className="col-md-6 mx-auto my-5">
      <h2 className="fw-bold mb-3">Login</h2>
      <Alert message={alert.msg} type={alert.type} onClose={() => setAlert({ msg: "", type: "" })} />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input className="form-control" type="text" name="username" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input className="form-control" type="password" name="password" required onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? <Loader /> : "Login"}
        </button>
      </form>
      <div className="mt-4 text-center">
        New user? <Link to="/register">Register here</Link>
      </div>
    </div>
  );
}
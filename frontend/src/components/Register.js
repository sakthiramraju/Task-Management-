import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import Alert from "./Alert";
import Loader from "./Loader";

export default function Register() {
  const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ msg: "", type: "" });
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setAlert({ msg: "", type: "" });
    try {
      await API.post("register/", credentials);
      setAlert({ msg: "Account created! You can now login.", type: "success" });
      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      setAlert({
        msg:
          (error.response && Object.values(error.response.data)[0]) ||
          "Registration failed.",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="col-md-6 mx-auto my-5">
      <h2 className="fw-bold mb-3">Register</h2>
      <Alert message={alert.msg} type={alert.type} onClose={() => setAlert({ msg: "", type: "" })} />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input className="form-control" type="text" name="username" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input className="form-control" type="email" name="email" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input className="form-control" type="password" name="password" required minLength={6} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? <Loader /> : "Register"}
        </button>
      </form>
      <div className="mt-4 text-center">
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
}
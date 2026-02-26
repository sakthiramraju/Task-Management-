import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("access");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container app-container">
        <Routes>
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
/*
Task Management System - Django Backend Configuration

Designed & Developed by Sakthiram
© 2026 Sakthiram. All Rights Reserved.

Production-ready settings for Railway deployment with
JWT Authentication, MySQL (Production), SQLite (Development),
CORS configuration, and secure environment handling.
*/

import React from "react";
export default function Alert({ type, message, onClose }) {
  if (!message) return null;
  return (
    <div className={`alert alert-${type || "info"} alert-dismissible`} role="alert">
      {message}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        style={{ float: "right" }}
        onClick={onClose}
      ></button>
    </div>
  );
}
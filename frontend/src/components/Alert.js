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
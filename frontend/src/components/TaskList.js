/*
Task Management System - Django Backend Configuration

Designed & Developed by Sakthiram
© 2026 Sakthiram. All Rights Reserved.

Production-ready settings for Railway deployment with
JWT Authentication, MySQL (Production), SQLite (Development),
CORS configuration, and secure environment handling.
*/

import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onTaskUpdate, onTaskDelete }) {
  if (!tasks.length) return <div className="alert alert-info">No tasks found.</div>;
  return (
    <div className="mt-3">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onTaskUpdate={onTaskUpdate}
          onTaskDelete={onTaskDelete}
        />
      ))}
    </div>
  );
}
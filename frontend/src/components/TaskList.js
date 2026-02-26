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
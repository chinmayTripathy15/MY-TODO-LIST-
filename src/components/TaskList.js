// src/components/TaskList.js
import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onComplete, onEdit }) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks added yet.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onComplete={onComplete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TaskList;

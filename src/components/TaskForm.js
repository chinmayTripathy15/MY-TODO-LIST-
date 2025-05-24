// src/components/TaskForm.js
import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTask = {
      id: Date.now(),
      text,
      priority,
      completed: false,
    };

    addTask(newTask);
    setText("");
    setPriority("medium");
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="row g-2">
        <div className="col-6">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="col-3">
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="col-3">
          <button type="submit" className="btn btn-primary w-100">
            Add
          </button>
        </div>
      </div>
    </form>
  );
}

export default TaskForm;

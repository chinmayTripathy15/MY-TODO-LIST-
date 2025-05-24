import React, { useState } from "react";

function TaskItem({ task, onDelete, onComplete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedPriority, setEditedPriority] = useState(task.priority);

  const handleSave = () => {
    if (editedText.trim() === "") return;
    onEdit(task.id, editedText, editedPriority);
    setIsEditing(false);
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString();
  };

  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-start ${
        task.completed ? "list-group-item-success" : ""
      }`}
    >
      <div className="ms-2 me-auto w-100">
        {isEditing ? (
          <div className="d-flex gap-2 mb-2">
            <input
              className="form-control"
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <select
              className="form-select"
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value)}
            >
              <option value="high">🔥 High</option>
              <option value="medium">⚡ Medium</option>
              <option value="low">💧 Low</option>
            </select>
            <button onClick={handleSave} className="btn btn-primary btn-sm">
              💾 Save
            </button>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong
                  className={`me-2 ${
                    task.completed ? "text-decoration-line-through" : ""
                  }`}
                >
                  {task.text}
                </strong>
                <span className="badge bg-secondary text-capitalize">
                  {task.priority}
                </span>
              </div>
              <div className="d-flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-sm btn-outline-primary"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onComplete(task.id)}
                  className={`btn btn-sm ${
                    task.completed
                      ? "btn-outline-warning"
                      : "btn-outline-success"
                  }`}
                >
                  {task.completed ? "↩️ Undo" : "✅ Complete"}
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="btn btn-sm btn-outline-danger"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>

            <div className="mt-2 text-muted small">
              <div>🕒 Start: {formatDate(task.startDate)}</div>
              {task.completed && (
                <div>✅ Completed: {formatDate(task.completeDate)}</div>
              )}
            </div>
          </>
        )}
      </div>
    </li>
  );
}

export default TaskItem;

import React, { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function App() {
 const [tasks, setTasks] = useState(() => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
});

  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("all");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [prioritySortOrder, setPrioritySortOrder] = useState("none");

  // ✅ Load tasks from localStorage on first render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // ✅ Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  const addTask = () => {
    if (newTask.trim() === "") return;

    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      priority: priority,
      startDate: new Date().toISOString(),
      completeDate: null,
    };

    setTasks([...tasks, task]);
    setNewTask("");
    setPriority("medium");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const completed = !task.completed;
          return {
            ...task,
            completed,
            completeDate: completed ? new Date().toISOString() : null,
          };
        }
        return task;
      })
    );
  };

  const editTask = (id, newText, newPriority) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              text: newText,
              priority: newPriority,
            }
          : task
      )
    );
  };

  const priorityValue = { high: 1, medium: 2, low: 3 };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .sort((a, b) => {
      if (prioritySortOrder === "asc") {
        return priorityValue[a.priority] - priorityValue[b.priority];
      } else if (prioritySortOrder === "desc") {
        return priorityValue[b.priority] - priorityValue[a.priority];
      } else {
        const dateA = a.completed ? new Date(a.completeDate) : new Date(a.startDate);
        const dateB = b.completed ? new Date(b.completeDate) : new Date(b.startDate);
        return dateB - dateA;
      }
    });

  return (
    <div className="app-background">
      <div className="toggle-theme p-3 text-end">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="btn btn-sm btn-outline-secondary"
        >
          {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="container">
        <h1 className="text-center mb-4">📝 My To-Do List</h1>

        <div className="input-group mb-3">
          <input
            type="text"
            placeholder="Enter a new task..."
            className="form-control"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <select
            className="form-select w-auto"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">🔥 High</option>
            <option value="medium">⚡ Medium</option>
            <option value="low">💧 Low</option>
          </select>
          <button onClick={addTask} className="btn btn-success">
            ➕ Add
          </button>
        </div>

        <div className="filter-buttons mb-3 d-flex justify-content-between align-items-center">
          <div className="d-flex gap-2">
            {["all", "active", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`btn btn-sm ${
                  filter === f ? "btn-primary" : "btn-outline-primary"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="text-muted">Sort:</span>
            <select
              className="form-select form-select-sm"
              value={prioritySortOrder}
              onChange={(e) => setPrioritySortOrder(e.target.value)}
            >
              <option value="none">🕒 Time</option>
              <option value="asc">⬇️ Low to High</option>
              <option value="desc">⬆️ High to Low</option>
            </select>
          </div>

          <div className="text-muted">
            Tasks: {filteredTasks.length} / {tasks.length}
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <p
            className={`text-center empty-message ${
              isDarkMode ? "text-light" : "text-muted"
            }`}
          >
            No tasks here. Add one! 🎉
          </p>
        ) : (
          <ul className="list-group">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onComplete={toggleComplete}
                onEdit={editTask}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;

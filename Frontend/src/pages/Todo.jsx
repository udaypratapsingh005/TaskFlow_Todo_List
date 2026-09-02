import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

import {
  getTasks,
  updateTask,
  deleteTask,
} from "../services/taskApi";

function Todo() {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // GET ACTIVE TASKS
  // =========================

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();

      setTasks(data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load tasks."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // =========================
  // CREATE TASK
  // =========================

  const handleTaskCreated = (task) => {
    // Sirf incomplete task ko active list mein add karo
    if (!task.completed) {
      setTasks((previousTasks) => [
        task,
        ...previousTasks,
      ]);
    }
  };

  // =========================
  // COMPLETE TASK
  // =========================

  const handleComplete = async (id) => {
    try {
      setError("");

      const data = await updateTask(id, {
        completed: true,
      });

      // Updated task agar completed hai,
      // to active list se remove kar do.
      if (data.task?.completed) {
        setTasks((previousTasks) =>
          previousTasks.filter(
            (task) => task._id !== id
          )
        );
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to complete task."
      );
    }
  };

  // =========================
  // DELETE TASK
  // =========================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteTask(id);

      setTasks((previousTasks) =>
        previousTasks.filter(
          (task) => task._id !== id
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete task."
      );
    }
  };

  // =========================
  // UPDATE / EDIT TASK
  // =========================

  const handleUpdate = async (id, updatedData) => {
    try {
      setError("");

      const data = await updateTask(
        id,
        updatedData
      );

      const updatedTask = data.task;

      // IMPORTANT:
      // Agar updated task completed ho gaya hai,
      // to active task list mein nahi rehna chahiye.
      if (updatedTask.completed) {
        setTasks((previousTasks) =>
          previousTasks.filter(
            (task) => task._id !== id
          )
        );

        return;
      }

      // Agar task abhi bhi active hai,
      // to usko updated data se replace karo.
      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task._id === id
            ? updatedTask
            : task
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update task."
      );

      // TaskCard ko bhi error pata chale
      // taaki "Saving..." properly stop ho.
      throw error;
    }
  };

  return (
    <main className="todo-page">

      {/* ================= HERO ================= */}

      <section className="hero">
        <div>
          <p className="eyebrow">
            TASK MANAGEMENT
          </p>

          <h1>Get things done.</h1>

          <p className="hero-text">
            Keep your tasks organized, stay focused,
            and track everything you've completed.
          </p>
        </div>

        <div className="task-count">
          <strong>{tasks.length}</strong>
          <span>Active Tasks</span>
        </div>
      </section>

      {/* ================= CREATE TASK ================= */}

      <TaskForm
        onTaskCreated={handleTaskCreated}
      />

      {/* ================= ERROR ================= */}

      {error && (
        <div className="error-banner">
          <span>{error}</span>

          <button
            onClick={() => setError("")}
          >
            ×
          </button>
        </div>
      )}

      {/* ================= ACTIVE TASKS ================= */}

      <section className="tasks-section">

        <div className="section-header">
          <div>
            <p className="section-label">
              CURRENT WORK
            </p>

            <h2>Active Tasks</h2>
          </div>

          <Link
            className="history-link"
            to="/history"
          >
            View History →
          </Link>
        </div>

        {/* ================= LOADING ================= */}

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>

            <p>
              Loading tasks...
            </p>
          </div>
        ) : (

          /* ================= TASK LIST ================= */

          <TaskList
            tasks={tasks}
            onComplete={handleComplete}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />

        )}

      </section>
    </main>
  );
}

export default Todo;
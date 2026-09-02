import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTaskHistory } from "../services/taskApi";

function History() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getTaskHistory();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch task history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <p>Loading history...</p>;
  }

  return (
    <main className="todo-page">
      <div className="page-header">
        <h1>Completed Tasks</h1>
        <Link to="/">← Back to Tasks</Link>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <h2>No completed tasks</h2>
          <p>Complete a task and it will appear here.</p>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div className="task-card completed-card" key={task._id}>
              <div>
                <h3>✓ {task.title}</h3>
                <p>{task.description}</p>

                <small>
                  Completed:{" "}
                  {new Date(task.updatedAt).toLocaleString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default History;
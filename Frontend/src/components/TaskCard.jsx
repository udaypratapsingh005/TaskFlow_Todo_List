import { useState } from "react";

function TaskCard({ task, onComplete, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = async () => {
    if (!title.trim()) {
      return;
    }

    await onUpdate(task._id, {
      title,
      description,
    });

    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="task-card edit-card">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        />

        <div className="task-actions">
          <button onClick={handleSave}>
            Save Changes
          </button>

          <button onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-card">
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>

      <div className="task-actions">
        <button onClick={() => onComplete(task._id)}>
          ✓ Complete
        </button>

        <button onClick={() => setIsEditing(true)}>
          ✏ Edit
        </button>

        <button onClick={() => onDelete(task._id)}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
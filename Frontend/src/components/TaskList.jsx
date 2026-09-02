import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  onComplete,
  onDelete,
  onUpdate,
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h2>No active tasks</h2>
        <p>You are all caught up.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default TaskList;
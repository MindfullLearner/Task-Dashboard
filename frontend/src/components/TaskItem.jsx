function TaskItem({
  task,
  editingId,
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
  onToggleStatus,
  onStartEditing,
  onCancelEditing,
  onSaveEdit,
  onDeleteTask,
}) {
  const isEditing = editingId === task._id;

  if (isEditing) {
    return (
      <li className="task-item editing">
        <div className="edit-fields">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <div className="edit-actions">
            <button className="save-btn" onClick={() => onSaveEdit(task._id)}>
              Save
            </button>
            <button className="cancel-btn" onClick={onCancelEditing}>
              Cancel
            </button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="task-text" onClick={() => onToggleStatus(task)}>
        <div className="task-top-row">
          <span className="task-title">{task.title}</span>
          <span className={`task-status status-${task.status}`}>
            {task.status}
          </span>
        </div>
        <div className="task-meta">
          <span className={`priority-badge priority-${task.priority}`}>
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="due-date">
              📅 {new Date(task.dueDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          )}
        </div>
      </div>
      <div className="task-actions">
        <button
          className="edit-btn"
          onClick={(e) => {
            e.stopPropagation();
            onStartEditing(task);
          }}
        >
          ✎
        </button>
        <button className="delete-btn" onClick={() => onDeleteTask(task._id)}>
          ✕
        </button>
      </div>
    </li>
  );
}

export default TaskItem;

function TaskForm({ title, setTitle, description, setDescription, onAddTask }) {
  return (
    <form className="task-form" onSubmit={onAddTask}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">+ Add Task</button>
    </form>
  );
}

export default TaskForm;

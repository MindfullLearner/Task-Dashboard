import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Dropdown from './Dropdown';

function TaskForm({
  title,
  setTitle,
  description,
  setDescription,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  onAddTask,
}) {
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

      <div className="form-row">
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <DatePicker
          selected={dueDate ? new Date(dueDate) : null}
          onChange={(date) =>
            setDueDate(date ? date.toISOString().split('T')[0] : '')
          }
          placeholderText="Select due date"
          dateFormat="MMM d, yyyy"
          className="date-picker-input"
        />
      </div>

      <button type="submit">+ Add Task</button>
    </form>
  );
}

export default TaskForm;

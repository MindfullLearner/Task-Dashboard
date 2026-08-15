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
        <Dropdown
          value={priority}
          onChange={setPriority}
          placeholder="Priority"
          options={[
            { value: 'low', label: 'Low Priority' },
            { value: 'medium', label: 'Medium Priority' },
            { value: 'high', label: 'High Priority' },
          ]}
        />

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

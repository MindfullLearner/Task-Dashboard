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
  category,
  setCategory,
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
          minDate={new Date()}
        />
      </div>
      <div className="form-row">
        <Dropdown
          value={category}
          onChange={setCategory}
          placeholder="Category"
          options={[
            { value: 'work', label: '💼 Work' },
            { value: 'health', label: '🏥 Health' },
            { value: 'project', label: '📁 Project' },
            { value: 'household', label: '🏠 Household' },
            { value: 'selfcare', label: '🧘 Self Care' },
            { value: 'other', label: '📌 Other' },
          ]}
        />
      </div>


      <button type="submit">+ Add Task</button>
    </form>
  );
}

export default TaskForm;

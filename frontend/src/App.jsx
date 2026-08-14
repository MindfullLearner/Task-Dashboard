import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch('http://localhost:5000/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Error fetching tasks:', err));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };
  const handleDeleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };
  const handleToggleStatus = async (task) => {
  const newStatus = task.status === 'pending' ? 'completed' : 'pending';

    try {
      const res = await fetch(`http://localhost:5000/tasks/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const updatedTask = await res.json();
  
      setTasks(
        tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t))
      );
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };
  const startEditing = (task) => {
  setEditingId(task._id);
  setEditTitle(task.title);
  setEditDescription(task.description);
  };
  
  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
  };
  
  const handleSaveEdit = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, description: editDescription }),
      });
      const updatedTask = await res.json();
  
      setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
      cancelEditing();
    } catch (err) {
      console.error('Error editing task:', err);
    }
  };

  const filteredTasks =
  filter === 'all' ? tasks : tasks.filter((task) => task.status === filter);
  
  return (
    <div className="app-container">
      <h1>📋 Task Dashboard</h1>
  
      <form className="task-form" onSubmit={handleAddTask}>
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
      <div className="filter-bar">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      {filteredTasks.length === 0 ? (
        <p className="empty-state">No tasks yet — add one above 👆</p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) =>
            editingId === task._id ? (
              <li key={task._id} className="task-item editing">
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
                    <button className="save-btn" onClick={() => handleSaveEdit(task._id)}>
                      Save
                    </button>
                    <button className="cancel-btn" onClick={cancelEditing}>
                      Cancel
                    </button>
                  </div>
                </div>
              </li>
            ) : (
              <li
                key={task._id}
                className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}
              >
                <div className="task-text" onClick={() => handleToggleStatus(task)}>
                  <span className="task-title">{task.title}</span>{' '}
                  <span className={`task-status status-${task.status}`}>
                    {task.status}
                  </span>
                </div>
                <div className="task-actions">
                  <button
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(task);
                    }}
                  >
                    ✎
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteTask(task._id)}>
                    ✕
                  </button>
                </div>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
export default App;

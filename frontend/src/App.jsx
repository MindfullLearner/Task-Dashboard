import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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
  
  return (
    <div>
      <h1>Task Dashboard</h1>

      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span
              onClick={() => handleToggleStatus(task)}
              style={{
                cursor: 'pointer',
                textDecoration: task.status === 'completed' ? 'line-through' : 'none',
              }}
            >
              {task.title} — {task.status}
            </span>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
    </ul>
    </div>
  );
}

export default App;

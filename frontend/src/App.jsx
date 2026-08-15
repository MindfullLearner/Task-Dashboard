import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('all');

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [toast, setToast] = useState(null);

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
        body: JSON.stringify({ title, description, priority, dueDate }),
      });
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      showToast('Task added successfully!');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter((task) => task._id !== id));
      showToast('Task deleted', 'error');
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
      setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
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
      showToast('Task updated!');
    } catch (err) {
      console.error('Error editing task:', err);
    }
  };

  const filteredTasks =
  filter === 'all' ? tasks : tasks.filter((task) => task.status === filter);

  const priorityOrder = { high: 0, medium: 1, low: 2 };
  
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === 'priority') {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });
  const showToast = (message, type = 'success') => {
  setToast({ message, type });
  setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="app-container">
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.message}</div>
      )}
      <h1>📋 Task Dashboard</h1>

      <TaskForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        priority={priority}
        setPriority={setPriority}
        dueDate={dueDate}
        setDueDate={setDueDate}
        onAddTask={handleAddTask}
      />

      <TaskList
        filteredTasks={filteredTasks}
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        editingId={editingId}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        onToggleStatus={handleToggleStatus}
        onStartEditing={startEditing}
        onCancelEditing={cancelEditing}
        onSaveEdit={handleSaveEdit}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default App;

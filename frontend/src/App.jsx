import { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ConfirmModal from './components/ConfirmModal';
import { FolderOpen } from 'lucide-react';
import StatsChart from './components/StatsChart';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || null);

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
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [currentView, setCurrentView] = useState('dashboard');
  const [category, setCategory] = useState('other');

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  useEffect(() => {
    if (username) {
      fetchTasks();
    }
  }, [username]);
  useEffect(() => {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}, [theme]);

  const fetchTasks = () => {
    setIsLoading(true);
    fetch('http://localhost:5000/tasks', { headers: getAuthHeaders() })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching tasks:', err);
        setIsLoading(false);
      });
  };

  const handleLoginSuccess = (loggedInUsername) => {
    setUsername(loggedInUsername);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(null);
    setTasks([]);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ title, description, priority, category, dueDate }),
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

  const confirmDeleteTask = (id) => setTaskToDelete(id);
  const cancelDeleteTask = () => setTaskToDelete(null);

  const handleDeleteTask = async () => {
    try {
      await fetch(`http://localhost:5000/tasks/${taskToDelete}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      setTasks(tasks.filter((task) => task._id !== taskToDelete));
      showToast('Task deleted', 'error');
      setTaskToDelete(null);
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    try {
      const res = await fetch(`http://localhost:5000/tasks/${task._id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
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
        headers: getAuthHeaders(),
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

  // Stats — derived from real task data
  const totalTasks = tasks.length;
  const pendingCount = tasks.filter((t) => t.status === 'pending').length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const dueThisWeekCount = tasks.filter((t) => {
    if (!t.dueDate || t.status === 'completed') return false;
    const due = new Date(t.dueDate);
    const now = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(now.getDate() + 7);
    return due >= now && due <= weekFromNow;
  }).length;

  if (!username) {
    return <Auth onLoginSuccess={handleLoginSuccess} />;
  }
  const toggleTheme = () => {
  setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="dashboard-shell">
      <Sidebar
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <div className="main-content">
        {toast && (
          <div className={`toast toast-${toast.type}`}>{toast.message}</div>
        )}

        <ConfirmModal
          isOpen={taskToDelete !== null}
          message="Are you sure you want to delete this task?"
          onConfirm={handleDeleteTask}
          onCancel={cancelDeleteTask}
        />

        {currentView === 'dashboard' && (
        <>
          <div className="top-banner">
            <div>
              <h2>Welcome back, {username} 👋</h2>
              <p>Here's what's on your plate today.</p>
            </div>
            <div className="user-avatar">
              {username.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="stats-row">
              <div className="stat-card">
                <span className="stat-number">{totalTasks}</span>
                <span className="stat-label">Total Tasks</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{pendingCount}</span>
                <span className="stat-label">Pending</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{completedCount}</span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{dueThisWeekCount}</span>
                <span className="stat-label">Due This Week</span>
              </div>
            </div>

            <div className="chart-section">
              <h3>Progress Overview</h3>
              <StatsChart pendingCount={pendingCount} completedCount={completedCount} />
            </div>
          </div>
        </>
      )}

      <TaskForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        priority={priority}
        setPriority={setPriority}
        category={category}
        setCategory={setCategory}
        dueDate={dueDate}
        setDueDate={setDueDate}
        onAddTask={handleAddTask}
      />

      <TaskList
        filteredTasks={sortedTasks}
        isLoading={isLoading}
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
        onDeleteTask={confirmDeleteTask}
      />
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Error fetching tasks:', err));
  }, []);

  return (
    <div>
      <h1>Task Dashboard</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} — {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

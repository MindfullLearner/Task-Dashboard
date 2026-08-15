import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const priorityColors = {
  low: '#1565c0',
  medium: '#e65100',
  high: '#c62828',
};

function CalendarView({ tasks }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = firstDayOfMonth.getDay();

  const goToPrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  const getTasksForDay = (day) => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      const due = new Date(task.dueDate);
      return (
        due.getFullYear() === year &&
        due.getMonth() === month &&
        due.getDate() === day
      );
    });
  };

  const today = new Date();
  const isToday = (day) =>
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day;

  const dayCells = [];
  for (let i = 0; i < startWeekday; i++) {
    dayCells.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayTasks = getTasksForDay(day);
    dayCells.push(
      <div
        key={day}
        className={`calendar-cell ${isToday(day) ? 'today' : ''} ${
          selectedDay === day ? 'selected' : ''
        }`}
        onClick={() => setSelectedDay(day)}
      >
        <span className="calendar-day-number">{day}</span>
        <div className="calendar-dots">
          {dayTasks.slice(0, 3).map((task) => (
            <span
              key={task._id}
              className="calendar-dot"
              style={{ background: priorityColors[task.priority] }}
              title={task.title}
            ></span>
          ))}
        </div>
      </div>
    );
  }

  const selectedDayTasks = selectedDay ? getTasksForDay(selectedDay) : [];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="calendar-nav-btn" onClick={goToPrevMonth}>
          <ChevronLeft size={18} />
        </button>
        <h3>
          {currentMonth.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </h3>
        <button className="calendar-nav-btn" onClick={goToNextMonth}>
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="calendar-weekdays">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="calendar-weekday">
            {d}
          </div>
        ))}
      </div>

      <div className="calendar-grid">{dayCells}</div>

      {selectedDay && (
        <div className="calendar-day-detail">
          <h4>
            Tasks on{' '}
            {new Date(year, month, selectedDay).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </h4>
          {selectedDayTasks.length === 0 ? (
            <p className="empty-state">No tasks due this day</p>
          ) : (
            <ul className="calendar-task-list">
              {selectedDayTasks.map((task) => (
                <li key={task._id} className="calendar-task-item">
                  <span
                    className="calendar-dot"
                    style={{ background: priorityColors[task.priority] }}
                  ></span>
                  {task.title}
                  <span className={`task-status status-${task.status}`}>
                    {task.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default CalendarView;

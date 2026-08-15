import TaskItem from './TaskItem';
import Dropdown from './Dropdown';

function TaskList({
  filteredTasks,
  isLoading,
  filter,
  setFilter,
  sortBy,
  setSortBy,
  editingId,
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
  onToggleStatus,
  onStartEditing,
  onCancelEditing,
  onSaveEdit,
  onDeleteTask,
}) {
  return (
    <>
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
      <div className="sort-bar">
        <label>Sort by:</label>
        <Dropdown
          value={sortBy}
          onChange={setSortBy}
          placeholder="Sort"
          options={[
            { value: 'none', label: 'Default' },
            { value: 'dueDate', label: 'Due Date' },
            { value: 'priority', label: 'Priority' },
          ]}
        />
      </div>
      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <p className="empty-state">No tasks yet — add one above 👆</p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              editingId={editingId}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editDescription={editDescription}
              setEditDescription={setEditDescription}
              onToggleStatus={onToggleStatus}
              onStartEditing={onStartEditing}
              onCancelEditing={onCancelEditing}
              onSaveEdit={onSaveEdit}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TaskList;

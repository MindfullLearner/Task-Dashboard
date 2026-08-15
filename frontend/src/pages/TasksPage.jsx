import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function TasksPage(props) {
  return (
    <>
      <TaskForm
        title={props.title}
        setTitle={props.setTitle}
        description={props.description}
        setDescription={props.setDescription}
        priority={props.priority}
        setPriority={props.setPriority}
        category={props.category}
        setCategory={props.setCategory}
        dueDate={props.dueDate}
        setDueDate={props.setDueDate}
        onAddTask={props.onAddTask}
      />

      <TaskList
        filteredTasks={props.filteredTasks}
        isLoading={props.isLoading}
        filter={props.filter}
        setFilter={props.setFilter}
        searchQuery={props.searchQuery}
        setSearchQuery={props.setSearchQuery}
        sortBy={props.sortBy}
        setSortBy={props.setSortBy}
        editingId={props.editingId}
        editTitle={props.editTitle}
        setEditTitle={props.setEditTitle}
        editDescription={props.editDescription}
        setEditDescription={props.setEditDescription}
        onToggleStatus={props.onToggleStatus}
        onStartEditing={props.onStartEditing}
        onCancelEditing={props.onCancelEditing}
        onSaveEdit={props.onSaveEdit}
        onDeleteTask={props.onDeleteTask}
      />
    </>
  );
}

export default TasksPage;

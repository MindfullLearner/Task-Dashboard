import CalendarView from '../components/CalendarView';

function CalendarPage({ tasks }) {
  return (
    <div className="page-container">
      <CalendarView tasks={tasks} />
    </div>
  );
}

export default CalendarPage;

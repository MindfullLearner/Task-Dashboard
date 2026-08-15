import StatsChart from '../components/StatsChart';

function DashboardPage({ username, totalTasks, pendingCount, completedCount, dueThisWeekCount }) {
  return (
    <>
    <div className="page-container">
      <div className="top-banner">
        <div>
          <h2>Welcome back, {username} 👋</h2>
          <p>Here's what's on your plate today.</p>
        </div>
        <div className="user-avatar">{username.charAt(0).toUpperCase()}</div>
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
    </div>
    </>
  );
}

export default DashboardPage;

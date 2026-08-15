function Sidebar({ onLogout }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">📋</div>
      <nav className="sidebar-nav">
        <button className="sidebar-icon active" title="Dashboard">🏠</button>
        <button className="sidebar-icon" title="Tasks">✅</button>
      </nav>
      <div className="sidebar-bottom">
        <button className="sidebar-icon" title="Logout" onClick={onLogout}>
          🚪
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
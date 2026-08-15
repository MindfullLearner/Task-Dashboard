import { LayoutDashboard, CheckSquare, LogOut, Sun, Moon } from 'lucide-react';

function Sidebar({ onLogout, theme, toggleTheme }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <LayoutDashboard size={22} color="white" />
      </div>
      <nav className="sidebar-nav">
        <button className="sidebar-icon active" title="Dashboard">
          <LayoutDashboard size={20} />
        </button>
        <button className="sidebar-icon" title="Tasks">
          <CheckSquare size={20} />
        </button>
      </nav>
      <div className="sidebar-bottom">
        <button className="sidebar-icon" title="Toggle theme" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="sidebar-icon" title="Logout" onClick={onLogout}>
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;

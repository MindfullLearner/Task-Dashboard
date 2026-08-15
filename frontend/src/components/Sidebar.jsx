import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Calendar, LogOut, Sun, Moon } from 'lucide-react';

function Sidebar({ onLogout, theme, toggleTheme }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <LayoutDashboard size={22} color="white" />
      </div>
      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `sidebar-icon ${isActive ? 'active' : ''}`}
          title="Dashboard"
        >
          <LayoutDashboard size={20} />
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) => `sidebar-icon ${isActive ? 'active' : ''}`}
          title="Tasks"
        >
          <CheckSquare size={20} />
        </NavLink>
        <NavLink
          to="/calendar"
          className={({ isActive }) => `sidebar-icon ${isActive ? 'active' : ''}`}
          title="Calendar"
        >
          <Calendar size={20} />
        </NavLink>
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

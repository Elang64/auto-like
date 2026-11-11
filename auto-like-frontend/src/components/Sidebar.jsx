import { NavLink, useLocation } from 'react-router-dom'
import {
  FiHome,
  FiHeart,
  FiMonitor,
  FiClock,
  FiSettings,
} from 'react-icons/fi'

const navItems = [
  { path: '/', label: 'Dashboard', icon: <FiHome /> },
  { path: '/auto-like', label: 'Auto Like', icon: <FiHeart /> },
  { path: '/browsers', label: 'Browser Status', icon: <FiMonitor /> },
  { path: '/history', label: 'Riwayat Task', icon: <FiClock /> },
  { path: '/settings', label: 'Pengaturan', icon: <FiSettings /> },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">AL</div>
          <div className="sidebar-logo-text">
            <h1>Auto-Like</h1>
            <span>RDA System</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-title">Menu</div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
            end={item.path === '/'}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-status">
          <span className="status-dot"></span>
          Backend Connected (Port 8081)
        </div>
      </div>
    </aside>
  )
}


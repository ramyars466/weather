import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/cities', label: 'Cities', icon: '🌍' },
  { path: '/analytics', label: 'Analytics', icon: '📈' },
  { path: '/alerts', label: 'Alerts', icon: '🔔' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
]

export default function Sidebar() {
  const sidebarStyle = {
    width: '220px',
    minHeight: '100vh',
    backgroundColor: '#1e293b',
    padding: '24px 16px',
    position: 'fixed',
    left: 0,
    top: 0
  }

  const logoStyle = {
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '32px',
    padding: '0 12px'
  }

  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    color: '#94a3b8',
    textDecoration: 'none',
    borderRadius: '8px',
    marginBottom: '4px',
    fontSize: '14px'
  }

  const activeStyle = {
    ...linkStyle,
    backgroundColor: '#334155',
    color: 'white'
  }

  return (
    <div style={sidebarStyle}>
      <div style={logoStyle}>Weather AI</div>
      {navItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => isActive ? activeStyle : linkStyle}
        >
          <span>{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </div>
  )
}
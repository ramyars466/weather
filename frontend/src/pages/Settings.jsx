export default function Settings() {
  const cardStyle = {
    backgroundColor: '#1e293b',
    borderRadius: '0.75rem',
    padding: '1.25rem',
    border: '1px solid #334155',
  }

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh' }}>
      <div style={{ 
        backgroundColor: '#1e293b', 
        padding: '1rem 1.5rem', 
        borderBottom: '1px solid #334155',
        marginBottom: '1.5rem',
        marginLeft: '240px',
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#f8fafc' }}>Settings</h1>
      </div>
      
      <div style={{ marginLeft: '240px', padding: '0 1.5rem' }}>
        <div style={cardStyle}>
          <div style={{ fontSize: '1rem', color: '#94a3b8', textAlign: 'center', padding: '3rem' }}>
            ⚙️ Settings - Coming Soon
          </div>
        </div>
      </div>
    </div>
  )
}
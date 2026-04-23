import { useState, useEffect } from 'react'
import { getLocations } from '../services/api'

const MOCK_CITIES = [
  { id: 1, name: 'Bangalore', temperature: 26, humidity: 65, wind_speed: 10 },
  { id: 2, name: 'Mumbai', temperature: 30, humidity: 75, wind_speed: 18 },
  { id: 3, name: 'Delhi', temperature: 32, humidity: 45, wind_speed: 12 },
  { id: 4, name: 'Chennai', temperature: 31, humidity: 70, wind_speed: 14 },
  { id: 5, name: 'Hyderabad', temperature: 29, humidity: 55, wind_speed: 8 },
  { id: 6, name: 'Kolkata', temperature: 30, humidity: 72, wind_speed: 10 },
  { id: 7, name: 'Pune', temperature: 27, humidity: 58, wind_speed: 9 },
  { id: 8, name: 'Ahmedabad', temperature: 34, humidity: 40, wind_speed: 8 },
  { id: 9, name: 'Jaipur', temperature: 33, humidity: 42, wind_speed: 10 },
  { id: 10, name: 'Surat', temperature: 31, humidity: 68, wind_speed: 12 },
]

export default function Cities() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLocations()
      .then(res => {
        const locs = res.data?.data || res.data || MOCK_CITIES
        setLocations(locs)
      })
      .catch(() => setLocations(MOCK_CITIES))
      .finally(() => setLoading(false))
  }, [])

  const cardStyle = {
    backgroundColor: '#1e293b',
    borderRadius: '0.75rem',
    padding: '1rem',
    border: '1px solid #334155',
  }

  const headerStyle = {
    backgroundColor: '#1e293b',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #334155',
    marginBottom: '1.5rem',
    marginLeft: '240px',
  }

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh' }}>
      <div style={headerStyle}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#f8fafc' }}>All Cities Weather</h1>
      </div>
      
      <div style={{ marginLeft: '240px', padding: '0 1.5rem' }}>
        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading cities...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
            {locations.map(city => (
              <div key={city.id} style={cardStyle}>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#f8fafc', marginBottom: '0.75rem' }}>{city.name}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                    🌡️ {city.temperature || 28}°C
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                    💧 {city.humidity || 65}%
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                    💨 {city.wind_speed || 10} km/h
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
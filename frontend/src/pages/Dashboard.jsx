import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'

const CITIES = [
  {id:1,name:'Bengaluru'},{id:2,name:'Delhi'},{id:3,name:'Mumbai'},{id:4,name:'Chennai'},{id:5,name:'Kolkata'},
  {id:6,name:'Hyderabad'},{id:7,name:'Pune'},{id:8,name:'Ahmedabad'},{id:9,name:'Jaipur'},{id:10,name:'Lucknow'},
  {id:11,name:'Bhopal'},{id:12,name:'Patna'},{id:13,name:'Bhubaneswar'},{id:14,name:'Raipur'},{id:15,name:'Ranchi'},
  {id:16,name:'Guwahati'},{id:17,name:'Chandigarh'},{id:18,name:'Shimla'},{id:19,name:'Dehradun'},{id:20,name:'Srinagar'},
  {id:21,name:'Jammu'},{id:22,name:'Amritsar'},{id:23,name:'Agra'},{id:24,name:'Varanasi'},{id:25,name:'Indore'},
  {id:26,name:'Nagpur'},{id:27,name:'Coimbatore'},{id:28,name:'Visakhapatnam'},{id:29,name:'Thiruvananthapuram'},{id:30,name:'Kochi'},
  {id:31,name:'Mysuru'},{id:32,name:'Panaji'},{id:33,name:'Leh'},{id:34,name:'Aizawl'},{id:35,name:'Imphal'},
  {id:36,name:'Shillong'},{id:37,name:'Kohima'},{id:38,name:'Agartala'},{id:39,name:'Itanagar'},{id:40,name:'Gangtok'},
  {id:41,name:'Puducherry'},{id:42,name:'Port Blair'},{id:43,name:'Kavaratti'},{id:44,name:'Daman'},{id:45,name:'Silvassa'}
]

const DEFAULT_WEATHER = { temperature: 28, humidity: 65, wind_speed: 12, confidence: 0.75 }
const DEFAULT_CHART = [
  {time:'1h',temp:28,low:25,high:31},
  {time:'3h',temp:28,low:25,high:31},
  {time:'6h',temp:29,low:26,high:32},
  {time:'12h',temp:30,low:27,high:33},
  {time:'24h',temp:29,low:26,high:32},
  {time:'72h',temp:28,low:25,high:31}
]

export default function Dashboard() {
  const [cityId, setCityId] = useState(1)
  const [weather, setWeather] = useState(DEFAULT_WEATHER)
  const [chartData, setChartData] = useState(DEFAULT_CHART)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    
    const fetchWeather = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/refresh/' + cityId, { method: 'POST' })
        const json = await res.json()
        if (!mounted) return
        
        const data = json?.data || {}
        const current = data?.current || {}
        const forecast = data?.forecast || []
        
        setWeather({
          temperature: current?.temperature || DEFAULT_WEATHER.temperature,
          humidity: current?.humidity || DEFAULT_WEATHER.humidity,
          wind_speed: current?.wind_speed || DEFAULT_WEATHER.wind_speed,
          confidence: current?.confidence || DEFAULT_WEATHER.confidence
        })
        
        if (forecast.length > 0) {
          setChartData(forecast.map(f => ({
            time: f.horizon + 'h',
            temp: f.temp_p50 || 28,
            low: f.temp_p10 || 25,
            high: f.temp_p90 || 31
          })))
        } else {
          setChartData(DEFAULT_CHART)
        }
      } catch (err) {
        if (!mounted) return
        console.error('Fetch error:', err)
        setError(err.message)
        setWeather(DEFAULT_WEATHER)
        setChartData(DEFAULT_CHART)
      }
      if (mounted) setLoading(false)
    }
    
    fetchWeather()
    return () => { mounted = false }
  }, [cityId])

  const cardStyle = {
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #334155'
  }

  return (
    <div style={{backgroundColor:'#0f172a', minHeight:'100vh', marginLeft:'240px'}}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1e293b',
        padding: '16px 32px',
        borderBottom: '1px solid #334155',
        marginBottom: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{color:'white', fontSize:'24px', fontWeight:'600'}}>Weather Dashboard</h1>
        <select 
          value={cityId} 
          onChange={(e) => setCityId(Number(e.target.value))}
          style={{
            backgroundColor:'#0f172a', 
            color:'white', 
            padding:'10px 16px', 
            borderRadius:'8px', 
            border:'1px solid #334155',
            minWidth:'180px',
            fontSize:'14px'
          }}
        >
          {CITIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{color:'#f87171', padding:'0 32px 20px'}}>
          Error: {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{color:'white', padding:'0 32px'}}>Loading weather data...</div>
      )}

      {/* Stats Cards */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'20px', marginBottom:'32px', padding:'0 32px'}}>
        <div style={cardStyle}>
          <div style={{color:'#94a3b8', fontSize:'14px', marginBottom:'8px'}}>Temperature</div>
          <div style={{color:'#3b82f6', fontSize:'36px', fontWeight:'bold'}}>{weather.temperature}°C</div>
        </div>
        <div style={cardStyle}>
          <div style={{color:'#94a3b8', fontSize:'14px', marginBottom:'8px'}}>Humidity</div>
          <div style={{color:'#06b6d4', fontSize:'36px', fontWeight:'bold'}}>{weather.humidity}%</div>
        </div>
        <div style={cardStyle}>
          <div style={{color:'#94a3b8', fontSize:'14px', marginBottom:'8px'}}>Wind Speed</div>
          <div style={{color:'#22c55e', fontSize:'36px', fontWeight:'bold'}}>{weather.wind_speed} km/h</div>
        </div>
        <div style={cardStyle}>
          <div style={{color:'#94a3b8', fontSize:'14px', marginBottom:'8px'}}>Confidence</div>
          <div style={{color:'#eab308', fontSize:'36px', fontWeight:'bold'}}>{Math.round(weather.confidence * 100)}%</div>
        </div>
      </div>

      {/* Charts */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'20px', padding:'0 32px 32px'}}>
        <div style={cardStyle}>
          <div style={{color:'white', fontSize:'18px', fontWeight:'600', marginBottom:'20px'}}>Temperature Forecast</div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{backgroundColor:'#1e293b', border:'1px solid #334155', borderRadius:'8px'}} labelStyle={{color:'white'}} wrapperStyle={{color:'white'}} />
              <Legend wrapperStyle={{color:'white'}} />
              <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={3} dot={{fill:'#3b82f6'}} name="Temp (°C)" />
              <Line type="monotone" dataKey="high" stroke="#ef4444" strokeWidth={1} strokeDasharray="5 5" dot={false} name="High" />
              <Line type="monotone" dataKey="low" stroke="#22c55e" strokeWidth={1} strokeDasharray="5 5" dot={false} name="Low" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={cardStyle}>
          <div style={{color:'white', fontSize:'18px', fontWeight:'600', marginBottom:'20px'}}>Forecast Confidence</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{backgroundColor:'#1e293b', border:'1px solid #334155', borderRadius:'8px'}} labelStyle={{color:'white'}} />
              <Legend />
              <Bar dataKey="high" fill="#ef4444" radius={[4,4,0,0]} name="High" />
              <Bar dataKey="temp" fill="#3b82f6" radius={[4,4,0,0]} name="Temp" />
              <Bar dataKey="low" fill="#22c55e" radius={[4,4,0,0]} name="Low" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
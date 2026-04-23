import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("CRASH ERROR:", error);
    console.error("CRASH INFO:", info);
  }
  render() {
    if (this.state.hasError) {
      const errorMsg = this.state.error?.message || this.state.error?.toString() || 'Unknown error';
      return (
        <div style={{color:'white', padding:'40px', background:'#0f172a', minHeight:'100vh', fontFamily:'monospace'}}>
          <h2 style={{color:'#f87171', marginBottom:'16px'}}>Runtime Error Detected:</h2>
          <pre style={{color:'#fca5a5', background:'#1e293b', padding:'20px', borderRadius:'8px', overflow:'auto'}}>
            {errorMsg}
          </pre>
          <button 
            onClick={() => window.location.reload()} 
            style={{marginTop:'20px', padding:'10px 20px', background:'#3b82f6', border:'none', borderRadius:'8px', color:'white', cursor:'pointer'}}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}
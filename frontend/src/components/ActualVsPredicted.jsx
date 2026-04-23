import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { refreshWeather } from '../services/api';

export default function ActualVsPredicted({ locationId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!locationId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    refreshWeather(locationId)
      .then(res => {
        const resData = res.data.data || res.data;
        const liveSeries = resData.live_series || resData.comparison || [];
        
        if (Array.isArray(liveSeries)) {
          const formatted = liveSeries.slice(-48).map(item => ({
            time: item.time || new Date(item.timestamp * 1000).toLocaleTimeString(),
            actual: item.actual ?? item.temperature,
            predicted: item.predicted ?? item.forecast
          }));
          setData(formatted);
        } else {
          setData([]);
        }
      })
      .catch(err => {
        console.error('Comparison API error:', err);
        setError(err.message);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [locationId]);

  if (!locationId) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Actual vs Predicted</h2>
        <p className="text-gray-500">Select a city to view data</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Actual vs Predicted</h2>
        <p className="text-gray-500">Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Actual vs Predicted</h2>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Actual vs Predicted</h2>
        <p className="text-gray-500">No data available. Click refresh to fetch weather data.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Actual vs Predicted</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="actual" stroke="#2563eb" strokeWidth={2} dot={false} name="Actual" />
          <Line type="monotone" dataKey="predicted" stroke="#dc2626" strokeWidth={2} dot={false} name="Predicted" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
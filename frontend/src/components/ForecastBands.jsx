import { useState, useEffect } from 'react';
import { refreshWeather } from '../services/api';

const HORIZONS = [
  { hours: 1, label: '1h' },
  { hours: 3, label: '3h' },
  { hours: 6, label: '6h' },
  { hours: 12, label: '12h' },
  { hours: 24, label: '24h' },
  { hours: 72, label: '72h' }
];

export default function ForecastBands({ locationId }) {
  const [forecast, setForecast] = useState(null);
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
        const forecastData = resData.forecast || resData;
        setForecast(forecastData);
      })
      .catch(err => {
        console.error('Forecast API error:', err);
        setError(err.message);
        setForecast(null);
      })
      .finally(() => setLoading(false));
  }, [locationId]);

  if (!locationId) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Forecast Bands</h2>
        <p className="text-gray-500">Select a city to view forecast</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Forecast Bands</h2>
        <p className="text-gray-500">Loading forecast...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Forecast Bands</h2>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Forecast Bands</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {HORIZONS.map(h => {
          const horizonData = forecast?.[h.hours] || forecast?.[h.label] || forecast?.[h.hours + 'h'];
          return (
            <div key={h.hours} className="p-3 bg-gray-50 rounded-lg text-center">
              <div className="text-sm font-medium text-gray-600">{h.label}</div>
              {horizonData ? (
                <>
                  <div className="text-lg font-bold text-gray-900">{Math.round(horizonData.p50 || horizonData.temperature)}°</div>
                  <div className="text-xs text-gray-500">±{Math.round(horizonData.confidence || 2)}°</div>
                </>
              ) : (
                <div className="text-sm text-gray-400">--</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
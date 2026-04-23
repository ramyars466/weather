import { useState, useEffect } from 'react';
import { getLocations } from '../services/api';

const REGIONS = {
  'North India': ['Delhi', 'Chandigarh', 'Shimla', 'Dehradun', 'Srinagar', 'Jammu', 'Amritsar', 'Agra', 'Varanasi', 'Lucknow', 'Jaipur', 'Leh'],
  'South India': ['Bengaluru', 'Chennai', 'Hyderabad', 'Kochi', 'Thiruvananthapuram', 'Coimbatore', 'Mysuru', 'Visakhapatnam', 'Puducherry'],
  'West India': ['Mumbai', 'Pune', 'Ahmedabad', 'Indore', 'Bhopal', 'Nagpur', 'Panaji', 'Daman', 'Silvassa'],
  'East India': ['Kolkata', 'Patna', 'Bhubaneswar', 'Ranchi', 'Raipur'],
  'North East India': ['Guwahati', 'Aizawl', 'Imphal', 'Shillong', 'Kohima', 'Agartala', 'Itanagar', 'Gangtok'],
  'Islands & UTs': ['Port Blair', 'Kavaratti']
};

function getRegion(cityName) {
  for (const [region, cities] of Object.entries(REGIONS)) {
    if (cities.includes(cityName)) return region;
  }
  return 'Other';
}

export default function CitySelector({ selectedCity, onSelect }) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocations()
      .then(res => setLocations(res.data.locations || res.data))
      .catch(err => console.error('Failed to load locations:', err))
      .finally(() => setLoading(false));
  }, []);

  const groupedLocations = locations.reduce((acc, loc) => {
    const region = getRegion(loc.name);
    if (!acc[region]) acc[region] = [];
    acc[region].push(loc);
    return acc;
  }, {});

  if (loading) {
    return <select className="w-full p-2 border rounded" disabled><option>Loading cities...</option></select>;
  }

  return (
    <select
      value={selectedCity || ''}
      onChange={(e) => onSelect(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-lg bg-white"
    >
      <option value="">Select a city</option>
      {Object.entries(groupedLocations).map(([region, cities]) => (
        <optgroup key={region} label={region}>
          {cities.map(city => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
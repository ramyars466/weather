import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export const getLocations = () => API.get('/locations');
export const getCurrentWeather = (cityId) => API.get(`/weather/current?city_id=${cityId}`);
export const getForecast = (cityId) => API.get(`/weather/forecast?city_id=${cityId}`);
export const refreshWeather = (cityId) => API.post(`/refresh/${cityId}`);

export default API;
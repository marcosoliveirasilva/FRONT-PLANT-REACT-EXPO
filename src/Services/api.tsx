import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3333/'
});

const apiWeather = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5/'
});

export { api, apiWeather };

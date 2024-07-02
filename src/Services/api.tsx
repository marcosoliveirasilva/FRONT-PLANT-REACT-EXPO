import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3333/'
});

const apiWeather = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5/'
});

const fetchDeseasesData = async (diagnosticID:string, distance:number) => {
  const response = await api.get('historicoScanns/Markers', {
    params: { page: 1, limit: 100, diagnosticID: diagnosticID, distance: distance },
    headers: { Authorization: api.defaults.headers['Authorization'] }
  });
  return response.data.map((item: {
    latitude: string;
    longitude: string;
    nomePlanta: string;
    nomeDoenca: string;
  }) => ({
    latitude: parseFloat(item.latitude),
    longitude: parseFloat(item.longitude),
    title: `${item.nomePlanta} - ${item.nomeDoenca}`,
    image: require('../assets/location-marker-warning.png')
  }));
};

const fetchStoresData = async () => {
  const response = await api.get('fornecedores', {
    params: { page: 1, limit: 100 },
    headers: { Authorization: api.defaults.headers['Authorization'] }
  });
  return response.data.map((item: {
    latitude: string;
    longitude: string;
    nomeEmpresa: string;
  }) => ({
    latitude: parseFloat(item.latitude),
    longitude: parseFloat(item.longitude),
    title: item.nomeEmpresa,
    image: require('../assets/convenience-store-map-2.png')
  }));
};

const fetchDiagnosticsData = async () => {
  const response = await api.get('diagnosticos', {
    params: { page: 1, limit: 100 },
    headers: { Authorization: api.defaults.headers['Authorization'] }
  });
  const data = response.data.map((item: {
    id: string;
    nomePlanta: string;
    nomeDoenca: string;
  }) => ({
    value: item.id,
    label: `${item.nomePlanta} - ${item.nomeDoenca}`,
  }));
  data.unshift({ value: '0', label: 'Exibir Todos' });
  return data;
};

export { api, apiWeather, fetchDeseasesData, fetchStoresData, fetchDiagnosticsData };

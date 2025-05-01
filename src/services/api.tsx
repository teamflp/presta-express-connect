
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.yourapp.com',
});

export const fetchArtisans = async (filters: Record<string, any>) => {
  const response = await api.get('/artisans', { params: filters });
  return response.data;
};

export const fetchArtisanDetails = async (id: string | number) => {
  const response = await api.get(`/artisans/${id}`);
  return response.data;
};

// Ajoutez d'autres appels API selon les besoins.

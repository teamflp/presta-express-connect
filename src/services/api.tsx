
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

export const fetchServicesByCategory = async (categoryId: number) => {
  const response = await api.get(`/categories/${categoryId}/services`);
  return response.data;
};

export const fetchProfessionalsByJob = async (jobId: number) => {
  const response = await api.get(`/jobs/${jobId}/professionals`);
  return response.data;
};

export const contactProfessional = async (professionalId: number, contactData: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  const response = await api.post(`/professionals/${professionalId}/contact`, contactData);
  return response.data;
};

export const fetchUserDashboardData = async (userId: string) => {
  const response = await api.get(`/users/${userId}/dashboard`);
  return response.data;
};

export const updateProfessionalProfile = async (userId: string, profileData: any) => {
  const response = await api.put(`/professionals/${userId}`, profileData);
  return response.data;
};

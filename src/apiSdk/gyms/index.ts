import axios from 'axios';
import queryString from 'query-string';
import { GymInterface, GymGetQueryInterface } from 'interfaces/gym';
import { GetQueryInterface } from '../../interfaces';

export const getGyms = async (query?: GymGetQueryInterface) => {
  const response = await axios.get(`/api/gyms${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createGym = async (gym: GymInterface) => {
  const response = await axios.post('/api/gyms', gym);
  return response.data;
};

export const updateGymById = async (id: string, gym: GymInterface) => {
  const response = await axios.put(`/api/gyms/${id}`, gym);
  return response.data;
};

export const getGymById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/gyms/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGymById = async (id: string) => {
  const response = await axios.delete(`/api/gyms/${id}`);
  return response.data;
};

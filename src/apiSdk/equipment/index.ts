import axios from 'axios';
import queryString from 'query-string';
import { EquipmentInterface, EquipmentGetQueryInterface } from 'interfaces/equipment';
import { GetQueryInterface } from '../../interfaces';

export const getEquipment = async (query?: EquipmentGetQueryInterface) => {
  const response = await axios.get(`/api/equipment${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEquipment = async (equipment: EquipmentInterface) => {
  const response = await axios.post('/api/equipment', equipment);
  return response.data;
};

export const updateEquipmentById = async (id: string, equipment: EquipmentInterface) => {
  const response = await axios.put(`/api/equipment/${id}`, equipment);
  return response.data;
};

export const getEquipmentById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/equipment/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEquipmentById = async (id: string) => {
  const response = await axios.delete(`/api/equipment/${id}`);
  return response.data;
};

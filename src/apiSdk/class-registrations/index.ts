import axios from 'axios';
import queryString from 'query-string';
import { ClassRegistrationInterface, ClassRegistrationGetQueryInterface } from 'interfaces/class-registration';
import { GetQueryInterface } from '../../interfaces';

export const getClassRegistrations = async (query?: ClassRegistrationGetQueryInterface) => {
  const response = await axios.get(`/api/class-registrations${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createClassRegistration = async (classRegistration: ClassRegistrationInterface) => {
  const response = await axios.post('/api/class-registrations', classRegistration);
  return response.data;
};

export const updateClassRegistrationById = async (id: string, classRegistration: ClassRegistrationInterface) => {
  const response = await axios.put(`/api/class-registrations/${id}`, classRegistration);
  return response.data;
};

export const getClassRegistrationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/class-registrations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteClassRegistrationById = async (id: string) => {
  const response = await axios.delete(`/api/class-registrations/${id}`);
  return response.data;
};

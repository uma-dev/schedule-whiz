import { Employee } from '../types/Employee';
import api from '../api/axiosConfig';

export const getEmployeeById = async (employeeId: number): Promise<Employee> => {
  const response = await api.get(`/api/employees/${employeeId}`);
  return response.data;
};

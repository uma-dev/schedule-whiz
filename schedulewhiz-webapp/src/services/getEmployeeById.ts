import { Employee } from "../types/Employee";
import api from "../api/axiosConfig";

export const getEmployeeById = async (
  employeeId: number,
  token: string | null,
): Promise<Employee> => {
  const response = await api.get(`/api/employees/${employeeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

import { Employee } from "../types/Employee";
import api from "../api/axiosConfig";

export const getEmployeeByEmail = async (
  employeeEmail: string | null,
  token: string | null,
): Promise<Employee> => {
  try {
    const response = await api.get(
      `/api/employees/search?employeeEmail=${employeeEmail}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error in authentication:", error);
    throw error;
  }
};

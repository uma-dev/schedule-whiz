import api from "../api/axiosConfig";
import { Record } from "../types/Record";

export const getRecordsByEmployeeId = async (
  employeeId: number,
): Promise<Record[]> => {
  try {
    const response = await api.get(`/api/records/${employeeId}`);
    return response.data as Record[];
  } catch (error) {
    console.error("Error fetching records by employee ID:", error);
    throw error;
  }
};

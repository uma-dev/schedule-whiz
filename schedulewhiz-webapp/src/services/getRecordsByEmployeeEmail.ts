import api from "../api/axiosConfig";
import { Record } from "../types/Record";

export const getRecordsByEmployeeEmail = async (
  employeeEmail: string | null,
  token: string | null,
): Promise<Record[]> => {
  try {
    const response = await api.get(
      `/api/records/search?employeeEmail=${employeeEmail}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data as Record[];
  } catch (error) {
    console.error("Error fetching records by employee email: ", error);
    throw error;
  }
};

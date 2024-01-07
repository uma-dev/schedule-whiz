import api from "../api/axiosConfig";
import { AuthResponse } from "../types/AuthResponse";

export const postRecord = async (
  employeeId: number,
  token: string | null,
): Promise<AuthResponse> => {
  try {
    const response = await api.post(
      "/api/records",
      {
        employee: { id: employeeId },
        schedule: { id: 3 },
        issue: null,
        startTime: "2023-12-16T05:32:44.363+00:00",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error creating a record:", error);
    throw error;
  }
};

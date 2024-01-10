import api from "../api/axiosConfig";
import { AuthResponse } from "../types/AuthResponse";

export const postRecord = async (
  employeeId: number,
  token: string | null,
): Promise<AuthResponse> => {
  try {
    const now = new Date();
    // Quit 6 hours for mexico city
    now.setHours(now.getHours() - 6);

    const response = await api.post(
      "/api/records",
      {
        employee: { id: employeeId },
        schedule: { id: 3 },
        issue: null,
        startTime: now,
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

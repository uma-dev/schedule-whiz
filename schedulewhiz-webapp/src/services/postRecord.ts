import api from "../api/axiosConfig";
import { AuthResponse } from "../types/AuthResponse";
import { getEmployeeByEmail } from "./getEmployeeByEmail";

export const postRecord = async (
  email: string,
  token: string | null,
): Promise<AuthResponse> => {
  try {
    const now = new Date();
    // Quit the hours of Time Zone in Mexico City
    now.setHours(now.getHours() - 6);

    const theEmployee = await getEmployeeByEmail(email, token);
    const theSchedule = theEmployee.schedule;

    const response = await api.post(
      "/api/records",
      {
        employee: { id: theEmployee.id },
        schedule: theSchedule,
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

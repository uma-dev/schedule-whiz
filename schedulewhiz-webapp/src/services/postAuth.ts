import api from "../api/axiosConfig";
import { AuthResponse } from "../types/AuthResponse";

export const postAuth = async (
  user: string,
  pwd: string,
): Promise<AuthResponse> => {
  try {
    const response = await api.post(
      "/api/auth/authenticate",
      { user, pwd },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error in authentication:", error);
    throw error;
  }
};

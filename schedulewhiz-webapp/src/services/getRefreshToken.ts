import api from "../api/axiosConfig";
import { AuthResponse } from "../types/AuthResponse";

export const getRefreshToken = async (
  token: string | null,
): Promise<AuthResponse> => {
  try {
    const response = await api.post(
      "/api/auth/refresh-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

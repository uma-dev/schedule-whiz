import api from "../api/axiosConfig";
import { AuthResponse } from "../types/AuthResponse";

export const registerUser = async (
  email: string,
  names: string,
  firstSurname: string,
  secondSurname: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const role = "USER";
    const response = await api.post(
      "/api/auth/register",
      { email, names, firstSurname, secondSurname, password, role },
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

import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth, auth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      "/api/auth/refresh-token",
      {},
      {
        headers: { Authorization: `Bearer ${auth.refreshToken}` },
        withCredentials: true,
      },
    );

    setAuth((prev) => {
      console.log("prev", JSON.stringify(prev));
      console.log("response", response.data.access_token);
      return { ...prev, accessToken: response.data.access_token };
    });
    return response.data.access_token;
  };
  return refresh;
};

export default useRefreshToken;

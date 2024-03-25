import useAuth from "./useAuth";
import api from "../api/axiosConfig";

const useRefreshToken = () => {
  const { setRefreshToken, tokenForRefresh } = useAuth();

  const refresh = async () => {
    const response = await api.post(
      "/api/auth/refresh-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenForRefresh}`,
        },
      },
    );

    setRefreshToken((prev) => {
      console.log("the new token: ");
      console.log(response.data.access_token);
      return response.data.access_token;
    });
    return response.data.access_token;
  };

  return refresh;
};

export default useRefreshToken;

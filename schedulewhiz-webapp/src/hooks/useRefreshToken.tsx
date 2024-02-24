import { getRefreshToken } from "../services/getRefreshToken";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setRefreshToken, tokenForRefresh } = useAuth();

  const refresh = async () => {
    const response = await getRefreshToken(tokenForRefresh);

    setRefreshToken((prev) => {
      console.log(JSON.stringify(prev));
      console.log("the new token: ");
      console.log(response.access_token);
      return response.access_token;
    });
    return response.access_token;
  };

  return refresh;
};

export default useRefreshToken;

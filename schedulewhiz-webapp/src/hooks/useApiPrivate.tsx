import { apiPrivate } from "../api/axiosConfig";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useApiPrivate = () => {
  const refresh = useRefreshToken();
  const { token } = useAuth();

  useEffect(() => {
    const requestIntercept = apiPrivate.interceptors.request.use(
      (config) => {
        // If its the initial request or after a refresh
        // add token
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Interceptors needs to be attached and then deattached
    const responseIntercept = apiPrivate.interceptors.response.use(
      (response) => response,
      // error handler, for example: token expired
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          // Get the new access token by request to "/api/auth/refresh-token"
          const newAccessToken = await refresh();
          console.log("new access token");
          console.log(newAccessToken);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          // Redo the request
          return apiPrivate(prevRequest);
        }
        // If above if its not true, return the error
        return Promise.reject(error);
      },
    );

    return () => {
      // Eject both the request and the response
      apiPrivate.interceptors.request.eject(requestIntercept);
      apiPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [token, refresh]);
  return apiPrivate;
};

export default useApiPrivate;

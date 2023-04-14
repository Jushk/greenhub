import { instance } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = instance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseIntercept = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return instance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestIntercept);
      instance.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return instance;
};

export default useAxiosPrivate;

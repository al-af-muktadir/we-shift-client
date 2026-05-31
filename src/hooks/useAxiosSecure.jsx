import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    //request intercept user req..intercept...server
    const reqInt = axiosSecure.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    //Res int
    const resInt = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const statusCode = error?.response?.status || error?.status || null;
        if (statusCode === 401 || statusCode === 403) {
          // attempt logout for unauthorized/forbidden responses

          logOut()
            .then(() => navigate("/login"))
            .catch(() => navigate("/login"));
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInt);
      axiosSecure.interceptors.response.eject(resInt);
    };
  }, [user, logOut, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;

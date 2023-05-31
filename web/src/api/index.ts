import axios from "axios";
import { logout } from "../store/user/userSlice";
import store from "../store";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
});

api.interceptors.request.use(
  (config) => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const { userInfo } = JSON.parse(userInfoString);
      if (userInfo?.token) {
        config.headers.Authorization = `Bearer ${userInfo.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error("Algum erro aconteceu!");
    if (
      error.response?.status === 401 &&
      error.response?.data?.msg === "Token has expired"
    ) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default api;

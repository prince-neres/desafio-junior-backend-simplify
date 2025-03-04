import axios from "axios";
import { logout } from "../store/user/userSlice";
import { resetTasks } from "../store/tasks/tasksSlice";
import store from "../store";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
});

api.interceptors.request.use(
  (config) => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const { user } = JSON.parse(userInfoString);
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
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
    toast.error(error.response?.data?.message);
    if (
      error.response?.status === 401 &&
      error.response?.data?.msg === "Token has expired"
    ) {
      store.dispatch(logout());
      store.dispatch(resetTasks());
    }
    return Promise.reject(error);
  }
);

export default api;

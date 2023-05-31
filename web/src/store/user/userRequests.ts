import { AppDispatch } from "..";
import {
  loginRequest,
  loginFail,
  loginSuccess,
  registerFail,
  registerRequest,
  registerSuccess,
} from "./userSlice";
import api from "../../api/";

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(loginRequest());
      const { data } = await api.post("/admin/login", {
        username: email,
        password: password,
      });
      dispatch(loginSuccess(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(loginFail(error.response.data));
    }
  };

export const register =
  (fullname: string, email: string, password: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(registerRequest());
      const { data } = await api.post("/register", {
        fullname,
        email,
        password,
      });
      dispatch(registerSuccess(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(registerFail(error.response.data));
    }
  };

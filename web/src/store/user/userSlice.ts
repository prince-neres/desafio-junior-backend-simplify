import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType, UserInfoType } from "../../types";
import { RootState } from "..";

const getInitialUserState = (): UserType => {
  const storedUserState = localStorage.getItem("userInfo");
  return storedUserState
    ? JSON.parse(storedUserState)
    : {
        loading: false,
        user: {
          token: "",
          username: "",
          email: "",
          created_at: "",
          updated_at: "",
        },
        error: "",
      };
};

const userSlice = createSlice({
  name: "user",
  initialState: getInitialUserState(),
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<UserInfoType>) => {
      state.error = "";
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(state));
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action: PayloadAction<UserInfoType>) => {
      state.error = "";
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(state));
    },
    registerFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = undefined;
      state.error = undefined;
      localStorage.removeItem("userInfo");
    },
  },
});

export const selectUser = (state: RootState) => state.user;

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  logout,
  registerFail,
  registerRequest,
  registerSuccess,
} = userSlice.actions;
export default userSlice.reducer;

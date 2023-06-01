import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import tasksReducer from "./tasks/tasksSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

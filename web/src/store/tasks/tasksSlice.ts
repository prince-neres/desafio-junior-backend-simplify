import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TasksInfoType, TaskType } from "../../types";

const getInitialTasksState = (): TasksInfoType => {
  return {
    loading: false,
    tasks: [],
    error: "",
  };
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: getInitialTasksState,
  reducers: {
    tasksRequest: (state) => {
      state.loading = true;
    },
    tasksSuccess: (state, action: PayloadAction<TaskType[]>) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    tasksFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { tasksRequest, tasksSuccess, tasksFail } = tasksSlice.actions;
export default tasksSlice.reducer;

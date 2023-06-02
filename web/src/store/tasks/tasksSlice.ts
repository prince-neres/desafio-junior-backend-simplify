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
    pushTask: (state, action: PayloadAction<TaskType>) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action: PayloadAction<TaskType>) => {
      const { id, ...updatedFields } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          ...updatedFields,
        };
      }
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    resetTasks: (state) => {
      state.tasks = [];
    },
  },
});

export const {
  tasksRequest,
  tasksSuccess,
  tasksFail,
  pushTask,
  editTask,
  removeTask,
  resetTasks,
} = tasksSlice.actions;
export default tasksSlice.reducer;

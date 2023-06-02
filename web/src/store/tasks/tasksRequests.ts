import { AppDispatch } from "..";
import {
  tasksRequest,
  tasksFail,
  tasksSuccess,
  pushTask,
  editTask,
  changeStatusTask,
  removeTask,
} from "./tasksSlice";
import api from "../../api/";
import { TaskType } from "../../types";
import { toast } from "react-toastify";

export const getTasks = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(tasksRequest());
    const { data } = await api.get("/tasks");
    dispatch(tasksSuccess(data));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    dispatch(tasksFail(error.response.data));
  }
};

export const addTask =
  (title: string, description: string, priority: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const { data } = await api.post("/tasks", {
        title,
        description,
        priority,
      });
      dispatch(pushTask(data.task));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

export const putTask =
  ({ id, title, description, priority, status }: TaskType) =>
  async (dispatch: AppDispatch) => {
    try {
      const { data } = await api.put(`/task/${id}`, {
        id,
        title,
        description,
        priority,
        status,
      });
      dispatch(editTask(data.task));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

export const patchStatusTask =
  (id: number, status: string) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await api.patch(`/task/${id}`, { status });
      const new_status = status === "PENDING" ? "COMPLETED" : "PENDING";
      dispatch(changeStatusTask({ id, status: new_status }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

export const deleteTask =
  (task_id: number) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await api.delete(`/task/${task_id}`);
      dispatch(removeTask(task_id));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

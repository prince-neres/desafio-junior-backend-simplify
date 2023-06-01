import { AppDispatch } from "..";
import { tasksRequest, tasksFail, tasksSuccess } from "./tasksSlice";
import api from "../../api/";

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

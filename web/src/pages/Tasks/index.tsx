import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getTasks } from "../../store/tasks/tasksRequests";
import Task from "../../components/Task";
import { selectUser } from "../../store/user/userSlice";
import InputAddTask from "../../components/InputAddTask";

export default function Tasks() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(selectUser);
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    user?.token && dispatch(getTasks());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-5 items-center flex-grow py-5 w-full">
      <InputAddTask />
      {tasks.map((task) => (
        <div key={task.id}>
          <Task {...task} />
        </div>
      ))}
    </div>
  );
}

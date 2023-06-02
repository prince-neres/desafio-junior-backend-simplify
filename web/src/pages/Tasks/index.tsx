import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getTasks } from "../../store/tasks/tasksRequests";
import Task from "../../components/Task";
import { selectUser } from "../../store/user/userSlice";
import InputAddTask from "../../components/InputAddTask";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector(selectUser);
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    user?.token && dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    if (!user?.token) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <div className="flex flex-col gap-10 items-center flex-grow py-5 w-full sm:px-20">
      <InputAddTask />
      <div className="flex flex-grow flex-wrap gap-5 justify-center items-center">
        {loading ? (
          <Loader />
        ) : tasks ? (
          tasks.map((task) => (
            <div key={task.id}>
              <Task {...task} />
            </div>
          ))
        ) : (
          <p>Nenhuma tarefa criada :(</p>
        )}
      </div>
    </div>
  );
}

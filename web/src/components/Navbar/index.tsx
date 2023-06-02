import { Link, useNavigate } from "react-router-dom";
import { selectUser, logout } from "../../store/user/userSlice";
import { resetTasks } from "../../store/tasks/tasksSlice";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";

export default function Navbar() {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetTasks());
    navigate("/login");
  };

  return (
    <nav className="py-4">
      {user?.token && (
        <div className="flex justify-between px-10">
          <p>Olá {user.username}!</p>
          <button onClick={handleLogout} className="flex items-center gap-1">
            <ArrowLeftOnRectangleIcon className="h-5" /> Sair
          </button>
        </div>
      )}
    </nav>
  );
}

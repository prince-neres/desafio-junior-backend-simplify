import { Link, useNavigate } from "react-router-dom";
import { selectUser, logout } from "../../store/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Navbar() {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="py-4 flex gap-3 justify-center">
      {!user?.token && <Link to={"/login"}>Login</Link>}
      {user?.token && <button onClick={handleLogout}>Sair</button>}
    </nav>
  );
}

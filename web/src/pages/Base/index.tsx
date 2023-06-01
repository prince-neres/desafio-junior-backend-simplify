import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/userSlice";
import { useEffect } from "react";

export default function Base() {
  const { user } = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <div className="h-screen flex flex-col justify-between text-center">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Base() {
  return (
    <div className="h-screen flex flex-col justify-between text-center">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

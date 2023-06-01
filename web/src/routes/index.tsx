import { BrowserRouter, Routes, Route } from "react-router-dom";
import Base from "../pages/Base";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Tasks from "../pages/Tasks";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />}>
          <Route index element={<Tasks />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

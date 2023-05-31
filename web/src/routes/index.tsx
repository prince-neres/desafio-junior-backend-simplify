import { BrowserRouter, Routes, Route } from "react-router-dom";
import Base from "../pages/Base";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Notes from "../pages/Notes";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />}>
          <Route index element={<Notes />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

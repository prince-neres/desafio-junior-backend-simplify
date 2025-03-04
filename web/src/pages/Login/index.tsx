import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../store/user/userRequests";
import { selectUser } from "../../store/user/userSlice";
import { AppDispatch } from "../../store";
import Loader from "../../components/Loader";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector(selectUser);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="flex flex-grow justify-center	items-center">
      <form onSubmit={handleSubmit} className="flex flex-col text-center">
        <input
          className="p-3 rounded outline-none text-black"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="mt-3 p-3 rounded outline-none text-black"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="font-bold rounded bg-green-500 hover:bg-green-700 p-3 my-5 text-white flex flex-row items-center justify-center duration-200"
          type="submit"
        >
          {userInfo.loading && <Loader />} Entrar
        </button>
        <div>
          Sem conta?{" "}
          <Link
            className="text-blue-700 hover:text-blue-500 duration-100"
            to={"/register"}
          >
            Cadastrar
          </Link>
        </div>
      </form>
    </div>
  );
}

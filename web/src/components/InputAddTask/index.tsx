import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addTask } from "../../store/tasks/tasksRequests";
import { PlusIcon } from "@heroicons/react/20/solid";

export default function InputAddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW");
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex flex-col md:h-12 md:flex-row gap-3">
      <input
        placeholder="Título"
        className="rounded p-2 outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Descrição"
        className="rounded p-2 outline-none z-10"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex justify-center items-center gap-2">
        <label htmlFor="countries" className="block">
          Prioridade:
        </label>
        <select
          id="countries"
          className="bg-white rounded border-none outline-none block w-full p-3"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="LOW">Baixa</option>
          <option value="NORMAL">Média</option>
          <option value="HIGH">Alta</option>
        </select>
      </div>
      <button
        className="flex items-center justify-center gap-2 bg-green-500 p-2 rounded text-white"
        onClick={() => {
          title &&
            description &&
            priority &&
            dispatch(addTask(title, description, priority));
        }}
      >
        <PlusIcon className="h-5" /> Adicionar
      </button>
    </div>
  );
}

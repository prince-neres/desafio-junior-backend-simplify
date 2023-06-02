import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { putTask } from "../../store/tasks/tasksRequests";
import { BookmarkIcon, XMarkIcon } from "@heroicons/react/20/solid";

interface InputsEditTaskProps {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InputsEditTask({
  id,
  title,
  description,
  priority,
  status,
  setEditMode,
}: InputsEditTaskProps) {
  const [titleUpdated, setTitle] = useState(title);
  const [descriptionUpdated, setDescription] = useState(description);
  const [priorityUpdated, setPriority] = useState(priority);
  const dispatch = useDispatch<AppDispatch>();

  const handlePutTask = () => {
    dispatch(
      putTask({
        id: id,
        title: titleUpdated,
        description: descriptionUpdated,
        priority: priorityUpdated,
        status: status,
      })
    );
    setEditMode(false);
  };

  return (
    <>
      <input
        value={titleUpdated}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 outline-none text-center font-bold"
      />
      <textarea
        value={descriptionUpdated}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full h-24 p-2 outline-none"
      />
      <div className="flex w-full justify-end gap-2">
        <div className="flex justify-center items-center gap-2">
          <label htmlFor="countries" className="block">
            Prioridade:
          </label>
          <select
            id="countries"
            className="text-gray-900 rounded border-none outline-none block w-full p-2"
            value={priorityUpdated}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="LOW">Baixa</option>
            <option value="NORMAL">Média</option>
            <option value="HIGH">Alta</option>
          </select>
        </div>
        <button
          className="p-2 rounded bg-blue-600 text-white"
          onClick={handlePutTask}
        >
          <BookmarkIcon className="h-5" />
        </button>
        <button
          className="p-2 rounded bg-gray-600 text-white"
          onClick={() => setEditMode(false)}
        >
          <XMarkIcon className="h-5" />
        </button>
      </div>
    </>
  );
}

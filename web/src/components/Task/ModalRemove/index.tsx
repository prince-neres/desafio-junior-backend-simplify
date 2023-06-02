import { XMarkIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { deleteTask } from "../../../store/tasks/tasksRequests";

type ModalRemove = {
  task_id: number;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ModalRemove({
  title,
  task_id,
  onCancel,
  onConfirm,
}: ModalRemove) {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveTask = () => {
    dispatch(deleteTask(task_id));
    onConfirm();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed inset-0  bg-opacity-80 backdrop-blur-md transition-opacity"
          onClick={onCancel}
        ></div>
        <div className="bg-white p-3 rounded overflow-hidden shadow-xl transform transition-all sm:w-full md:w-1/2 lg:w-1/3">
          <div className="flex items-center justify-between">
            <h3>{title}</h3>
            <XMarkIcon
              className="w-8 h-8 text-gray-400 cursor-pointer hover:text-gray-500 duration-100"
              onClick={onCancel}
            />
          </div>
          <div className="flex gap-2 mt-5">
            <button
              type="button"
              className="font-bold justify-center w-full rounded p-2 bg-green-600 text-white hover:bg-green-500"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="font-bold justify-center w-full rounded p-2 bg-red-600 text-white hover:bg-red-500"
              onClick={handleRemoveTask}
            >
              Deletar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

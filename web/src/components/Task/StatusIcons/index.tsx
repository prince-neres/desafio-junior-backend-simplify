import { CheckIcon, ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { patchStatusTask } from "../../../store/tasks/tasksRequests";

export default function StatusIcons({
  id,
  status,
}: {
  id: number;
  status: string;
}) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div onClick={() => dispatch(patchStatusTask(id, status))}>
      {status === "COMPLETED" ? (
        <button className="p-2 bg-yellow-500 rounded text-white">
          <ArrowUturnLeftIcon className="h-5" />
        </button>
      ) : (
        <button className="p-2 bg-green-500 rounded text-white">
          <CheckIcon className="h-5" />
        </button>
      )}
    </div>
  );
}

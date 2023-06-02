import { useState } from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import ModalRemove from "../ModalRemove";

export default function ActionButtons({
  task_id,
  setEditMode,
}: {
  task_id: number;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [showModalRemove, setShowModalRemove] = useState(false);
  return (
    <>
      {showModalRemove && (
        <ModalRemove
          title="Confirmar deleção?"
          task_id={task_id}
          onCancel={() => setShowModalRemove(false)}
          onConfirm={() => setShowModalRemove(false)}
        />
      )}
      <button
        className="bg-blue-500 p-2 rounded text-white"
        onClick={() => setEditMode(true)}
      >
        <PencilSquareIcon className="h-5" />
      </button>
      <button
        className="bg-red-500 p-2 rounded text-white"
        onClick={() => setShowModalRemove(true)}
      >
        <TrashIcon className="h-5" />
      </button>
    </>
  );
}

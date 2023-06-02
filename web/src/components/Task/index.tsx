import { useState } from "react";
import { TaskType } from "../../types";
import PriorityIcons from "./PriorityIcons";
import StatusIcons from "./StatusIcons";
import ActionButtons from "./ActionButtons";
import InputsEditTask from "../InputEditTask";

export default function Task({
  id,
  title,
  description,
  status,
  priority,
}: TaskType) {
  const [editMode, setEditMode] = useState(false);

  return (
    <div
      className={`flex flex-col gap-3 justify-center rounded items-center w-80  p-3 ${
        status === "COMPLETED" ? "bg-green-300" : "bg-white"
      }`}
    >
      {!editMode ? (
        <>
          <div className="flex justify-center items-center">
            <input
              value={title}
              className={`p-2 w-full text-center font-bold ${
                status === "COMPLETED" ? "bg-green-300" : "bg-white"
              }`}
              disabled
            />
            <div className="pr-2">
              <PriorityIcons priority={priority} />
            </div>
          </div>
          <textarea
            className={`p-2 w-full h-24 outline-none ${
              status === "COMPLETED" ? "bg-green-300" : "bg-white"
            }`}
            value={description}
            disabled
          />

          <div className="w-full flex justify-end items-center gap-2">
            <StatusIcons id={id} status={status} />
            <ActionButtons task_id={id} setEditMode={setEditMode} />
          </div>
        </>
      ) : (
        <InputsEditTask
          id={id}
          title={title}
          description={description}
          priority={priority}
          status={status}
          setEditMode={setEditMode}
        />
      )}
    </div>
  );
}

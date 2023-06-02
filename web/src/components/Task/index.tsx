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
    <>
      <div className="flex gap-3 justify-center items-center">
        {!editMode ? (
          <div
            className={`flex gap-3 justify-center items-center ${
              status === "COMPLETED" ? "bg-gray-500" : null
            }`}
          >
            <input value={title} className="p-2 bg-white rounded" disabled />
            <input
              value={description}
              className="p-2 bg-white rounded"
              disabled
            />
            <PriorityIcons priority={priority} />
            <StatusIcons status={status} />
            <ActionButtons task_id={id} setEditMode={setEditMode} />
          </div>
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
    </>
  );
}

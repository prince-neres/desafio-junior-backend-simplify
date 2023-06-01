import { TaskType } from "../../types";

export default function Task({
  title,
  description,
  status,
  priority,
  created_at,
  updated_at,
}: TaskType) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{status}</p>
      <p>{priority}</p>
      <p>{created_at}</p>
      <p>{updated_at}</p>
    </div>
  );
}

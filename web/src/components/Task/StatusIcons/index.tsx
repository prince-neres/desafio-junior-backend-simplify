import { CheckIcon, ArrowUturnLeftIcon } from "@heroicons/react/20/solid";

export default function StatusIcons({ status }: { status: string }) {
  return status === "COMPLETED" ? (
    <button className="p-2 bg-yellow-500 rounded text-white">
      <ArrowUturnLeftIcon className="h-5" />
    </button>
  ) : (
    <button className="p-2 bg-green-500 rounded text-white">
      <CheckIcon className="h-5" />
    </button>
  );
}

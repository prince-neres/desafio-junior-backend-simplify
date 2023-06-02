import {
  ChevronDoubleDownIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";

export default function PriorityIcons({ priority }: { priority: string }) {
  return (
    <div>
      {(() => {
        switch (priority) {
          case "LOW":
            return <ChevronDoubleDownIcon className="h-7 text-gray-500" />;
          case "NORMAL":
            return <ExclamationTriangleIcon className="h-7 text-yellow-500" />;
          case "HIGH":
            return <ExclamationCircleIcon className="h-7 text-red-500" />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

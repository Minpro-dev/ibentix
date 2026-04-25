import { useEventStore } from "../store/useEventStore";

export default function FreeToggle() {
  const isFree = useEventStore((state) => state.isFree);
  const setIsFree = useEventStore((state) => state.setIsFree);

  return (
    <div className="flex items-center gap-3">
      {/* Toggle Track */}
      <div
        onClick={setIsFree}
        className={`relative w-8 sm:w-12 h-5 sm:h-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
          isFree === "true" ? "bg-indigo-600 shadow-sm" : "bg-gray-200"
        }`}>
        {/* Toggle Knob */}
        <div
          className={`absolute top-1 w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full transition-all duration-300 ease-in-out shadow-sm ${
            isFree === "true" ? "left-4 sm:left-7" : "left-1"
          }`}
        />
      </div>

      {/* Label */}
      <span
        onClick={setIsFree}
        className={`text-xs cursor-pointer transition-colors duration-200 ${
          isFree === "true" ? "text-indigo-600" : "text-zinc-500"
        }`}>
        Free
      </span>
    </div>
  );
}

import { useEventStore } from "../store/useEventStore";

export default function FreeToggle() {
  const isFree = useEventStore((state) => state.isFree);
  const setIsFree = useEventStore((state) => state.setIsFree);

  return (
    <div className="flex items-center gap-3">
      {/* Toggle Track */}
      <div
        onClick={setIsFree}
        className={`relative w-12 h-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
          isFree === "true" ? "bg-indigo-600 shadow-sm" : "bg-gray-200"
        }`}>
        {/* Toggle Knob */}
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ease-in-out shadow-sm ${
            isFree === "true" ? "left-7" : "left-1"
          }`}
        />
      </div>

      {/* Label */}
      <span
        onClick={setIsFree}
        className={`text-sm cursor-pointer transition-colors duration-200 ${
          isFree === "true" ? "text-indigo-600" : "text-gray-400"
        }`}>
        Free
      </span>
    </div>
  );
}

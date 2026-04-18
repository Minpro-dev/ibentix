import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import type { SelectedEventType } from "../types/selectedEventType";
import { formatDate } from "../../../../utils/dateFormatter";

interface EventPromotionCardProps {
  eventId: string;
  title: string;
  city: string;
  onSelectEvent: (eventId: string, title: string, location: string) => void;
  selectedEvent: SelectedEventType;
  startSellingDate: string;
  endSellingDate: string;
}

function EventPromotionCard({
  eventId,
  title,
  city,
  onSelectEvent,
  selectedEvent,
  startSellingDate,
  endSellingDate,
}: EventPromotionCardProps) {
  return (
    <div
      onClick={() => onSelectEvent(eventId, title, city)}
      className="group cursor-pointer border-b border-slate-100 last:border-0">
      <div
        className={`flex justify-between items-center py-4 px-6 transition-all duration-300 ${
          selectedEvent.eventId === eventId
            ? "bg-indigo-50/30"
            : "hover:bg-slate-50"
        }`}>
        <div className="flex gap-4 items-center">
          <div className="space-y-1">
            {/* Title */}
            <h4
              className={`text-sm transition-colors ${
                selectedEvent.eventId === eventId
                  ? "text-indigo-600"
                  : "text-zinc-700"
              }`}>
              {title}
            </h4>

            {/* Info Row: Date & City */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-400">
                <span>{formatDate(startSellingDate)}</span>
                <span className="text-zinc-200">—</span>
                <span>{formatDate(endSellingDate)}</span>
              </div>
              <p className="text-xs text-indigo-400/80 tracking-wide uppercase">
                {city}
              </p>
            </div>
          </div>
        </div>

        {/* Selection Indicator */}
        <div className="flex items-center">
          {selectedEvent.eventId === eventId ? (
            <IoMdCheckmarkCircleOutline className="text-2xl text-indigo-500 animate-in zoom-in duration-300" />
          ) : (
            <div className="w-5 h-5 border-2 border-slate-200 rounded-full group-hover:border-indigo-200 transition-colors" />
          )}
        </div>
      </div>
    </div>
  );
}

export default EventPromotionCard;

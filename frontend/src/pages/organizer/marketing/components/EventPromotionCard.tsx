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
    <div onClick={() => onSelectEvent(eventId, title, city)}>
      <div className="flex justify-between items-center py-3 px-5 border-b border-slate-200 hover:bg-slate-100 transition-all duration-300">
        <div className="flex gap-4 items-center">
          {/* Name */}
          <div>
            <div>
              <h4 className="text-base text-zinc-600">{title}</h4>
            </div>
            <div className="flex gap-3">
              <div>
                <p>{formatDate(startSellingDate)} /</p>
              </div>
              <div>
                <p>{formatDate(endSellingDate)}</p>
              </div>
            </div>
            <p className="text-base text-zinc-600">{city}</p>
          </div>
        </div>

        {selectedEvent.eventId === eventId && (
          <div>
            <IoMdCheckmarkCircleOutline className="text-2xl text-indigo-500 cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
}

export default EventPromotionCard;

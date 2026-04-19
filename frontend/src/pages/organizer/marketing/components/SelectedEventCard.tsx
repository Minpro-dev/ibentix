import type { SelectedEventType } from "../types/selectedEventType";

interface SelectedEventCardProps {
  selectedEvent: SelectedEventType;
}

function SelectedEventCard({ selectedEvent }: SelectedEventCardProps) {
  const isNotSelected =
    !selectedEvent.eventId && !selectedEvent.location && !selectedEvent.title;

  return (
    <div className="mb-4 border-2 rounded-xl py-4 px-4 border-indigo-400 border-dashed">
      {isNotSelected ? (
        <p className="text-xs text-zinc-400">Please select an event first</p>
      ) : (
        <>
          <h4 className="text-lg text-zinc-700 pb-2">{selectedEvent.title}</h4>
          <p className="text-xs text-zinc-400">{selectedEvent.location}</p>
        </>
      )}
    </div>
  );
}

export default SelectedEventCard;

import EventCard from "../../../../ui/EventCard";
import { useEventWishlistStore } from "../../../../store/useEventWishlistStore";
import type { Event } from "../../../../types/eventType";

export function EventGrid() {
  const events = useEventWishlistStore((state) => state.events);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {events?.map((event: Event, index: number) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
}

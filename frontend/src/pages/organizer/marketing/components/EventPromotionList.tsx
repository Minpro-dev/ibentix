import { useQuery } from "@tanstack/react-query";
import SearchInput from "../../../../ui/SearchInput";
import EventPromotionCard from "./EventPromotionCard";
import { handleGetAllEvent } from "../../../../services/eventService";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import type { Event } from "../../../../types/eventType";
import type { SelectedEventType } from "../types/selectedEventType";

interface EventPromotionListProps {
  onSelectEvent: (eventId: string, title: string, location: string) => void;
  selectedEvent: SelectedEventType;
}

function EventPromotionList({
  onSelectEvent,
  selectedEvent,
}: EventPromotionListProps) {
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 800);

  const { data } = useQuery({
    queryKey: ["event-promotion", searchValue],
    queryFn: () => handleGetAllEvent(searchValue),
  });
  const events = data?.data.data.events;
  return (
    <div>
      <div className="mb-5">
        <SearchInput
          placeholder="Search an event..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="border py-2 border-slate-200 h-75 md:h-80 overflow-y-auto rounded-xl">
        {events?.map((event: Event) => (
          <EventPromotionCard
            key={event.eventId}
            eventId={event.eventId}
            title={event.title}
            city={event.city}
            startSellingDate={event.startSellingDate}
            endSellingDate={event.endSellingDate}
            onSelectEvent={onSelectEvent}
            selectedEvent={selectedEvent}
          />
        ))}
      </div>
    </div>
  );
}

export default EventPromotionList;

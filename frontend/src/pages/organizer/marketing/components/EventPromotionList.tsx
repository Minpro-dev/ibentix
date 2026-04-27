import { useQuery } from "@tanstack/react-query";
import SearchInput from "../../../../ui/SearchInput";
import EventPromotionCard from "./EventPromotionCard";
import { handleGetAllEvent } from "../../../../services/eventService";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import type { Event } from "../../../../types/eventType";
import type { SelectedEventType } from "../types/selectedEventType";
import EventSelectorSkeleton from "./EventSelectorSkeleton";
import EmptyOrganizerList from "../../organizerProfile/components/EmptyOrganizerList";
import { StepBack, StepForward } from "lucide-react";

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
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["event-promotion", searchValue, page],
    queryFn: () => handleGetAllEvent(searchValue, undefined, undefined, page),
  });

  const events = data?.data.data.events;
  const totalPage = data?.data.data.totalPage;
  const isShowSkeleton = isLoading || !data;

  const handleDecrementPage = () => {
    if (page === 1) return;

    setPage((page) => page - 1);
  };

  const handleIncrementPage = () => {
    if (page === totalPage) return;
    setPage((page) => page + 1);
  };

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
        {isShowSkeleton ? (
          Array.from({ length: 5 }).map((_, i) => (
            <EventSelectorSkeleton key={i} />
          ))
        ) : !events?.length ? (
          <EmptyOrganizerList dataName="promotions" />
        ) : (
          events?.map((event: Event) => (
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
          ))
        )}
      </div>

      <section className="flex justify-center items-center mt-8 mb-4">
        <div className="flex items-center gap-1 bg-zinc-50 p-1.5 rounded-xl border border-zinc-200">
          <button
            disabled={page === 1}
            onClick={handleDecrementPage}
            className="p-2 cursor-pointer rounded-lg transition-all duration-200 enabled:hover:bg-white enabled:hover:text-indigo-600 enabled:hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed text-zinc-600">
            <StepBack size={20} />
          </button>

          <div className="px-4 flex items-center gap-1.5">
            <span className="text-sm font-semibold text-indigo-600">
              {page}
            </span>
            <span className="text-sm text-zinc-400">/</span>
            <span className="text-sm font-medium text-zinc-500">
              {totalPage}
            </span>
          </div>

          <button
            disabled={page === totalPage}
            onClick={handleIncrementPage}
            className="p-2 rounded-lg cursor-pointer transition-all duration-200 enabled:hover:bg-white enabled:hover:text-indigo-600 enabled:hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed text-zinc-600">
            <StepForward size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}

export default EventPromotionList;

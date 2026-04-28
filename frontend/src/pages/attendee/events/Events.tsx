import { useEffect, useState } from "react";
import EventCard from "../../../ui/EventCard";
import type { Event, EventCategory } from "../../../types/eventType";
import CategoryFilter from "./components/CategoryFilters";
import { useEventStore } from "../../../store/useEventStore";
import { useDebounce } from "use-debounce";
import { useEeventQuery } from "./hooks/useEventQuery";
import PaginationButton from "../../../ui/PaginationButton";
import EventCardSkeleton from "./components/EventCardSkeleton";
import EmptyOrganizerList from "../../organizer/organizerProfile/components/EmptyOrganizerList";
import BrowseHeader from "./components/BrowseHeader";
import { useSearchParams } from "react-router-dom";

export default function Events() {
  const [searchParms] = useSearchParams();
  const categoryParams = searchParms.get("cat")?.toUpperCase();
  const [selectedCategory, setSelectedCategory] =
    useState<EventCategory | null>((categoryParams as EventCategory) || null);
  const [page, setPage] = useState(1);
  const search = useEventStore((state) => state.search);
  const isFree = useEventStore((state) => state.isFree);

  const [searchValue] = useDebounce(search, 800);
  const { data, isLoading } = useEeventQuery(
    searchValue,
    selectedCategory,
    isFree,
    page,
  );

  const handleSelect = (category: EventCategory | null) => {
    setSelectedCategory(category);
  };

  const handleSetpage = (num: number) => {
    setPage(num);
  };

  const events = data?.data.data.events;
  const allEvents = events?.filter(
    (event: Event) => new Date(event.endSellingDate) >= new Date(),
  );
  const totalEvents = data?.data.data.totalData;
  const totalPage = data?.data.data.totalPage;

  useEffect(() => {
    document.title = `Event | Browse your favorite events`;

    return () => {
      document.title = "Ibentix";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F8FAFC]">
      <main className="grow pt-20 pb-20 px-6 max-w-400 mx-auto w-full">
        {/* Title Section */}
        <BrowseHeader isLoading={isLoading} totalEvents={totalEvents} />

        {/* Filters Section */}
        <section className="sticky top-16 z-30 rounded-xl bg-white/80 backdrop-blur-md pb-6 pt-4 space-y-6 transition-all duration-300 border-b border-zinc-100/50">
          <div className="container mx-auto px-5">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelect={handleSelect}
            />
          </div>
        </section>

        {/* Event Grid*/}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {isLoading || !data ? (
            Array.from({ length: 12 }).map((_, index: number) => (
              <EventCardSkeleton key={index} />
            ))
          ) : !allEvents?.length ? (
            <EmptyOrganizerList dataName="event" />
          ) : (
            allEvents?.map((event: Event, index: number) => (
              <EventCard key={index} event={event} />
            ))
          )}
        </section>
        {/* Pagination */}
        {totalPage > 1 && (
          <nav className="mt-20 flex justify-center items-center gap-2">
            <PaginationButton
              onClick={handleSetpage}
              page={page}
              totalPage={totalPage}
            />
          </nav>
        )}
      </main>
    </div>
  );
}

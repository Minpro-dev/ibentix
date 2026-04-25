import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import EventCard from "../../../ui/EventCard";
import type { Event, EventCategory } from "../../../types/eventType";
import CategoryFilter from "./components/CategoryFilters";
import { useEventStore } from "../../../store/useEventStore";
import { useDebounce } from "use-debounce";
import { useEeventQuery } from "./hooks/useEventQuery";
import PaginationButton from "../../../ui/PaginationButton";

export default function Events() {
  const [selectedCategory, setSelectedCategory] =
    useState<EventCategory | null>(null);
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

  const allEvents = data?.data.data.events;
  const totalEvents = data?.data.data.totalData;
  const totalPage = data?.data.data.totalPage;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F8FAFC]">
      {/* Header telah dihapus sesuai permintaan */}

      <main className="grow pt-20 pb-20 px-6 max-w-400 mx-auto w-full">
        {/* Title Section */}
        <section className="mb-12 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900">
              Explore All Events
            </h1>
            <p className="text-slate-500 text-lg">
              Curated experiences in Indonesia's most vibrant cities.
              <span className="font-bold text-blue-600 ml-1.5">
                {totalEvents} events available.
              </span>
            </p>
          </motion.div>
        </section>

        {/* Filters Section */}
        <section className="mb-12 space-y-6">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelect={handleSelect}
          />
        </section>

        {/* Event Grid*/}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {allEvents?.map((event: Event, index: number) => (
            <EventCard key={index} event={event} />
          ))}
        </section>
        {/* Pagination */}
        <nav className="mt-20 flex justify-center items-center gap-2">
          <PaginationButton
            onClick={handleSetpage}
            page={page}
            totalPage={totalPage}
          />
        </nav>
      </main>
    </div>
  );
}

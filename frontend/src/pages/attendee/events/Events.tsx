import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import EventCard from "../../../ui/EventCard";
import { useQuery } from "@tanstack/react-query";
import { handleGetAllActiveEvents } from "../../../services/eventService";
import type { Event } from "../../../types/eventType";
import CategoryFilter from "./components/CategoryFilters";
import { useEventStore } from "../../../store/useEventStore";
import { useDebounce } from "use-debounce";

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const search = useEventStore((state) => state.search);

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
  };

  const [searchValue] = useDebounce(search, 800);
  const { data } = useQuery({
    queryKey: ["events", searchValue, selectedCategory],
    queryFn: () => handleGetAllActiveEvents(searchValue, selectedCategory),
  });

  const allEvents = data?.data.data.events;
  const totalEvents = data?.data.data.totalData;

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
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-blue-600 transition-all shadow-sm">
            <ChevronLeft className="w-4 h-4" />
          </button>
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              className={`w-10 h-10 flex items-center justify-center rounded-xl font-black text-xs transition-all ${num === 1 ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "bg-white border border-slate-100 text-slate-400 hover:bg-slate-50"}`}>
              {num}
            </button>
          ))}
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-blue-600 transition-all shadow-sm">
            <ChevronRight className="w-4 h-4" />
          </button>
        </nav>
      </main>

      <footer className="bg-white border-t border-slate-100 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center py-8 px-6 max-w-7xl mx-auto">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            © 2026 Vista Pass. Digital Concierge Experience.
          </p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import Hero from "./components/Hero";

import { useQuery } from "@tanstack/react-query";
import { handleGetTrendingEvent } from "../../../services/eventService";
import type { Event } from "../../../types/eventType";
import { RiArrowRightLine } from "react-icons/ri";
import { CATEGORIES } from "../../../static/categoriesList";
import EventCard from "../../../ui/EventCard";

export function HomePage() {
  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: handleGetTrendingEvent,
  });
  const trendingEvents = data?.data.data;

  console.log("Data --> ", data?.data.data);
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Hero />

      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Kategori Icons */}
        <section className="flex justify-start md:justify-between gap-6 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {CATEGORIES.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-3 cursor-pointer group min-w-20">
              {/* Container Ikon */}
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:bg-blue-50 group-hover:shadow-md transition-all duration-300">
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
              </div>

              {/* Label Text */}
              <span className="text-xs font-semibold text-gray-600 text-center group-hover:text-blue-600 transition-colors">
                {item.label}
              </span>
            </div>
          ))}
        </section>

        {/* Event Reccomendation- Trending Event */}
        <section className="mb-12">
          <div className="flex justify-between items-end p-6">
            <div>
              <h2 className="text-xl font-bold">Event recommendation!</h2>
              <p className="text-gray-500 text-sm">Popular events for you</p>
            </div>
            <button className="text-blue-500 font-bold text-sm">
              Explore more
            </button>
          </div>

          {/* Wrapper Slider */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {trendingEvents?.map((event: Event) => (
              <EventCard event={event} />
            ))}
          </div>
        </section>

        {/* Event in Selected City Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-white border border-zinc-100 rounded-3xl">
            <div className="space-y-1.5">
              {/* Subtle Section Label */}
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-500/80">
                Discovery
              </p>

              <h2 className="text-2xl font-medium text-zinc-900 tracking-tight">
                Recommended{" "}
                <span className="text-zinc-400 font-light">Events</span>
              </h2>

              <p className="text-zinc-400 text-sm font-normal leading-relaxed max-w-sm">
                Handpicked experiences happening in your city.
              </p>
            </div>

            <div>
              <button className="group flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-[11px] font-medium uppercase tracking-wider hover:bg-indigo-600 transition-all duration-300 active:scale-95 shadow-sm">
                View All
                <RiArrowRightLine className="text-base opacity-70 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* Banner Iklan */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-2xl overflow-hidden h-48 bg-blue-100">
            <img
              src="https://picsum.photos/seed/promo1/800/400"
              className="w-full h-full object-cover"
              alt="Promo"
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-48 bg-yellow-100">
            <img
              src="https://picsum.photos/seed/promo2/800/400"
              className="w-full h-full object-cover"
              alt="Promo"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;

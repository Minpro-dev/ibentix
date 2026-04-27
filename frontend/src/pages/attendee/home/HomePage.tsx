import Hero from "./components/Hero";

import type { Event } from "../../../types/eventType";
import { RiArrowRightLine } from "react-icons/ri";
import { CATEGORIES } from "../../../static/categoriesList";
import EventCard from "../../../ui/EventCard";
import { useTrendingEvents } from "./hooks/useTrendingEvents";
import EventCardSkeleton from "../events/components/EventCardSkeleton";
import EmptyOrganizerList from "../../organizer/organizerProfile/components/EmptyOrganizerList";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./components/CategoryCard";
import HomePageCta from "./components/HomePageCta";
import PromoSection from "./components/PromoSection";

export function HomePage() {
  const { data, isLoading } = useTrendingEvents();
  const navigate = useNavigate();
  const events = data?.data.data;

  const trendingEvents = events?.filter(
    (event: Event) => new Date(event.endSellingDate) >= new Date(),
  );

  return (
    <div className="bg-gray-50 min-h-dvh font-sans">
      <Hero />

      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* categoryCta */}
        <section className="flex justify-start md:justify-between gap-6 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {CATEGORIES.map((item, index: number) => (
            <CategoryCard
              key={index}
              icon={item.icon}
              label={item.label}
              onClick={() =>
                navigate(`/events?cat=${item.label.toLowerCase()}`)
              }
            />
          ))}
        </section>

        {/* Event Reccomendation- Trending Event */}
        <section className="mb-12">
          <div className="block sm:flex justify-between items-end p-6">
            <div>
              <h2 className="text-xl font-semibold pb-2">
                Event recommendation!
              </h2>
              <p className="text-gray-500 text-sm  pb-2  sm:pb-0 ">
                Popular events for you
              </p>
            </div>
            <div>
              <button
                onClick={() => navigate("/events")}
                className="group flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 cursor-pointer text-sm transition-colors">
                Explore more
                <RiArrowRightLine
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  size={16}
                />
              </button>
            </div>
          </div>

          {/* Wrapper Slider */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {isLoading || !data ? (
              Array.from({ length: 12 }).map((_, index: number) => (
                <EventCardSkeleton key={index} />
              ))
            ) : !trendingEvents?.length ? (
              <EmptyOrganizerList dataName="trending event" />
            ) : (
              trendingEvents?.map((event: Event) => (
                <EventCard key={event.eventId} event={event} />
              ))
            )}
          </div>
        </section>

        {/* CTA Section */}
        <HomePageCta />

        {/* Banner Iklan */}
        <PromoSection />
      </main>
    </div>
  );
}

export default HomePage;

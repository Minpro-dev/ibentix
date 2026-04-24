import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RiCalendarLine, RiMapPin2Line } from "react-icons/ri";
import type { Event } from "../../../types/eventType";
import { useFetchEventSlug } from "./hooks/useFetchEventSlug";
import DetailsHeader from "./Components/DetailsHeader";
import DetailsThumbnail from "./Components/DetailsThumbnail";
import DetailsActionBar from "./Components/DetailsActionBar";
import { DetailsEventSkeleton } from "./Components/DetailsEventSkeleton";

export default function EventDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [ticketCount, setTicketCount] = useState(1);
  const { data, isLoading, isError } = useFetchEventSlug(slug);
  const event: Event = data?.data?.data;

  const handleDecrement = () => {
    setTicketCount(Math.max(1, ticketCount - 1));
  };

  const handleIncrement = () => {
    setTicketCount(Math.min(event.availableSlot, ticketCount + 1));
  };

  if (isLoading) return <DetailsEventSkeleton />;

  if (isError || !event)
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center bg-white p-6 text-center">
        <h1 className="text-xl font-medium text-gray-900">Page is not found</h1>
        <button
          onClick={() => navigate("/")}
          className="mt-4 cursor-pointer text-indigo-600 text-sm hover:underline">
          Return Home
        </button>
      </div>
    );

  return (
    <div className="min-h-dvh bg-white text-gray-900 antialiased">
      {/* haeder navigation */}
      <DetailsHeader />

      <main className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            {/* thumbnail */}
            <DetailsThumbnail
              thumbnailUrl={event.thumbnailUrl}
              title={event.title}
            />

            {/* tittle */}
            <div className="mt-10 space-y-6">
              <div className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase border border-indigo-200 text-indigo-600 rounded-full">
                {event.category || "Event"}
              </div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-black leading-none">
                {event.title}
              </h1>

              <div className="flex flex-wrap gap-8 py-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <RiCalendarLine className="text-indigo-600" size={20} />
                  <span className="text-xs font-medium text-zinc-600">
                    {new Date(event.eventDate).toLocaleDateString("id-ID", {
                      dateStyle: "full",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <RiMapPin2Line className="text-indigo-600" size={20} />
                  <span className="text-xs font-medium text-zinc-600">
                    {event.city}
                  </span>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="pt-16 border-t border-gray-100">
              <h2 className="text-xs text-gray-400 mb-3">Description</h2>
              <div className="text-gray-600 leading-relaxed max-w-2xl text-lg whitespace-pre-line">
                {event.description}
              </div>
            </div>

            {/* venue */}
            <div className="mt-16 pt-16 border-t border-gray-100">
              <h2 className="text-xs text-gray-400 mb-3">Location & Venue</h2>
              <div className="space-y-2">
                <p className="text-xl font-medium text-black">
                  {event.locationName}
                </p>
                <p className="text-gray-500 text-sm">{event.address}</p>
              </div>
            </div>
          </div>

          {/* sidebar action */}
          <div className="lg:col-span-5">
            <DetailsActionBar
              availableSlot={event.availableSlot}
              endSellingDate={event.endSellingDate}
              eventId={event.eventId}
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
              isFree={event.isFree}
              price={event.price}
              ticketCount={ticketCount}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

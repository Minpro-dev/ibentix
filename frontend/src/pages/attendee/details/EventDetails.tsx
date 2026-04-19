import { About } from "../../../ui/About";
import { Location } from "../../../ui/Location";
import { Footer } from "../../../ui/Footer";
import { Sidebar } from "../../../ui/Sidebar";
import { MobileNav } from "../../../ui/MobileNav";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { handleGetEventBySlug } from "../../../services/eventService";
import { Hero } from "./Components/EventHero";

export default function EventDetails() {
  const { slug } = useParams();

  const { data } = useQuery({
    queryKey: ["event-details", slug],
    queryFn: () => handleGetEventBySlug(slug as string),
  });

  const eventDetails = data?.data.data;

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-32">
        <Hero
          title={eventDetails?.title}
          eventDate={eventDetails?.eventDate}
          eventLocation={eventDetails?.locationName}
          city={eventDetails?.city}
          thumbnailUrl={eventDetails?.thumbnailUrl}
          price={eventDetails?.price}
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-24">
            <About description={eventDetails?.description} />
            <Location />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 h-fit sticky top-28">
            <Sidebar eventId={eventDetails?.eventId} />
          </aside>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}

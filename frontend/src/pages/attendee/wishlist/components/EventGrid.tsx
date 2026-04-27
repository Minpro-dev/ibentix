import type { Event } from "../../../../types/eventType";
import EventCard from "../../../../ui/EventCard";
import EmptyOrganizerList from "../../../organizer/organizerProfile/components/EmptyOrganizerList";
import EventCardSkeleton from "../../events/components/EventCardSkeleton";
import { useFetchWishlist } from "../hooks/useFetchWishlist";

interface EventWishlistProps {
  event: Event;
}

export function EventGrid() {
  const { data, isLoading } = useFetchWishlist();
  const events = data?.data.data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {isLoading || !data ? (
        Array.from({ length: 12 }).map((_, index: number) => (
          <EventCardSkeleton key={index} />
        ))
      ) : !events?.length ? (
        <EmptyOrganizerList dataName="wishlist" />
      ) : (
        events?.map((event: EventWishlistProps, index: number) => (
          <EventCard key={index} event={event.event} />
        ))
      )}
    </div>
  );
}

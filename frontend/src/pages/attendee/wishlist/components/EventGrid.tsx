import { useFetchWishlist } from "../hooks/useFetchWishlist";
import { useEventlistStore } from "../../../../store/useEventWishlistStore";
import EventCard from "../../../../ui/EventCard";
import type { WishlistType } from "../types/wishlistType";

export function EventGrid() {
  const { data, isLoading } = useFetchWishlist();
  const wishlistEvents = data?.data.data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {wishlistEvents?.map((event: WishlistType, index: number) => {
        return <EventCard key={index} event={event.event} />;
      })}
    </div>
  );
}

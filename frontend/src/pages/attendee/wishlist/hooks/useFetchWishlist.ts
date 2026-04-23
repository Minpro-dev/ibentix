import { useQuery } from "@tanstack/react-query";
import { handleGetWishlist } from "../../../../services/wishlistService";
import { useEventWishlistStore } from "../../../../store/useEventWishlistStore";
import type { WishlistType } from "../types/wishlistType";
import type { Event } from "../../../../types/eventType";

export const useFetchWishlist = () => {
  const setEvents = useEventWishlistStore((state) => state.setEvents);
  const setIds = useEventWishlistStore((state) => state.setIds);

  const { data, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await handleGetWishlist();
      const wishlist = res.data.data;

      const wishlistEvents: Event[] = wishlist?.map(
        (wishlist: WishlistType) => {
          return wishlist.event;
        },
      );

      wishlistEvents.forEach((event) => {
        setIds(event.eventId);
      });

      setEvents(wishlistEvents);

      return res;
    },
  });

  return { data, isLoading };
};

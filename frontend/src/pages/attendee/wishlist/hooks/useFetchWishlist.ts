import { useQuery } from "@tanstack/react-query";
import { handleGetWishlist } from "../../../../services/wishlistService";
import { useEventWishlistStore } from "../../../../store/useEventWishlistStore";
import type { Event } from "../../../../types/eventType";

export const useFetchWishlist = () => {
  const setIds = useEventWishlistStore((state) => state.setIds);

  const { data, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await handleGetWishlist();
      const wishlist = res.data.data;

      const ids = wishlist?.map((event: Event) => event.eventId);

      setIds(ids);

      return res;
    },
  });

  return { data, isLoading };
};

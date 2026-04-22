import { useQuery } from "@tanstack/react-query";
import { handleGetWishlist } from "../../../../services/wishlistService";
import { useEventlistStore } from "../../../../store/useEventWishlistStore";
import type { WishlistType } from "../types/wishlistType";

export const useFetchWishlist = () => {
  const setEvents = useEventlistStore((state) => state.setEvents);
  const { data, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await handleGetWishlist();
      const wishlist = res.data.data;
      //   console.log("res", res.data.data);

      const wishlistEvents = wishlist?.map((wishlist: WishlistType) => {
        return wishlist.event;
      });

      //   console.log("res", wishlistEvents);

      setEvents(wishlistEvents);

      return res;
    },
  });

  return { data, isLoading };
};

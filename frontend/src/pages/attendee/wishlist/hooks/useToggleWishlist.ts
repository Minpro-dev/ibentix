import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleToggleWishlist } from "../../../../services/wishlistService";
import { useEventWishlistStore } from "../../../../store/useEventWishlistStore";
import Swal from "sweetalert2";

export const useToggleWishlist = () => {
  const setIds = useEventWishlistStore((state) => state.setIds);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (eventId: string) => {
      return await handleToggleWishlist(eventId);
    },

    onMutate: async (eventId: string) => {
      // cancel refetch if there's any
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });

      // save snapshot
      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      setIds(eventId);

      return { previousWishlist };
    },

    onError: (err, eventId) => {
      // ROLLBACK
      setIds(eventId);
      Swal.fire("Error", "Failed to update wishlist", "error");
      console.log(err);
    },

    onSettled: () => {
      //syncronize
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};

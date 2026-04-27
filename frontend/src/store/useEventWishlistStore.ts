import { create } from "zustand";

interface EventState {
  wishlistIds: string[];
  setIds: (eventId: string[]) => void;
  toggleWishlist: (eventId: string) => void;
}

export const useEventWishlistStore = create<EventState>()((set) => ({
  wishlistIds: [],
  setIds: (eventIds) => set({ wishlistIds: eventIds }),
  toggleWishlist: (eventId) =>
    set((state) => ({
      wishlistIds: state.wishlistIds.includes(eventId)
        ? state.wishlistIds.filter((id) => id !== eventId)
        : [...state.wishlistIds, eventId],
    })),
}));

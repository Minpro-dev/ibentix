import { create } from "zustand";
import type { Event } from "../types/eventType";

interface EventState {
  events: Event[];
  wishlistIds: string[];
  setEvents: (events: Event[]) => void;
  setIds: (eventId: string) => void;
  toggleWishlist: (eventId: string) => void;
}

export const useEventWishlistStore = create<EventState>()((set) => ({
  events: [],
  wishlistIds: [],
  setEvents: (events) => set({ events }),

  setIds: (eventId) =>
    set((state) => {
      if (state.wishlistIds.includes(eventId)) return state;

      return {
        wishlistIds: [...state.wishlistIds, eventId],
      };
    }),

  toggleWishlist: (eventId) =>
    set((state) => ({
      wishlistIds: state.wishlistIds.includes(String(eventId))
        ? state.wishlistIds.filter((id) => id !== String(eventId))
        : [...state.wishlistIds, String(eventId)],
    })),
}));

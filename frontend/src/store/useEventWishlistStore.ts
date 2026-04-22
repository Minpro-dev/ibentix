import { create } from "zustand";
import type { Event } from "../types/wishlistType";

interface EventState {
  events: Event[];
  wishlistIds: string[];
  setEvents: (events: Event[]) => void;
  setIds: (eventId: string) => void;
}

export const useEventlistStore = create<EventState>()((set) => ({
  events: [],
  wishlistIds: [],
  setEvents: (events) => set({ events }),
  setIds: (eventId) =>
    set((state) => ({
      wishlistIds: state?.wishlistIds.includes(eventId)
        ? state.wishlistIds
        : [...state.wishlistIds, eventId],
    })),
}));

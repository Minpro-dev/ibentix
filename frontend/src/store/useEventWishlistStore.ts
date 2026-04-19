import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Event } from '../types/wishlistType';

interface EventState {
  events: Event[];
  wishlistIds: string[];
  isLoading: boolean;
  error: string | null;
  setEvents: (events: Event[]) => void;
  toggleWishlist: (eventId: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useEventStore = create<EventState>()(
  persist(
    (set) => ({
      events: [],
      wishlistIds: [],
      isLoading: false,
      error: null,
      setEvents: (events) => set({ 
        events,
        wishlistIds: events.map(e => e.id) 
      }),
      toggleWishlist: (eventId) =>
        set((state) => ({
          wishlistIds: state.wishlistIds.includes(eventId)
            ? state.wishlistIds
            : [...state.wishlistIds, eventId],
        })),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'event-storage',
      partialize: (state) => ({ wishlistIds: state.wishlistIds }),
    }
  )
);

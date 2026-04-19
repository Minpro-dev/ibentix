import { create } from 'zustand';

interface EventState {
  selectedTicketId: string | null;
  setSelectedTicket: (id: string) => void;
  isBooking: boolean;
  setBooking: (state: boolean) => void;
}

export const useEventStore = create<EventState>((set) => ({
  selectedTicketId: 'reg', // Default to regular
  setSelectedTicket: (id) => set({ selectedTicketId: id }),
  isBooking: false,
  setBooking: (state) => set({ isBooking: state }),
}));

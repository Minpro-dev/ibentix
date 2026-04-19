import { create } from "zustand";

interface State {
  eventId: string;
  ticketQuantity: number;
}

interface Action {
  setTicketQuantity: (num: number) => void;
  setEventId: (id: string) => void;
}

export const useOrderStore = create<State & Action>((set) => ({
  eventId: "",
  ticketQuantity: 0,
  setTicketQuantity: (num) => set({ ticketQuantity: num }),
  setEventId: (id) => set({ eventId: id }),
}));

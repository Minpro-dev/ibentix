import { create } from "zustand";

interface State {
  search: string;
}

interface Action {
  setSearch: (search: string) => void;
}

export const useEventStore = create<State & Action>((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
}));

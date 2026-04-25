import { create } from "zustand";

interface State {
  search: string;
  isFree: string;
}

interface Action {
  setSearch: (search: string) => void;
  setIsFree: () => void;
}

export const useEventStore = create<State & Action>((set) => ({
  search: "",
  isFree: "",
  setSearch: (search) => set({ search }),
  setIsFree: () =>
    set((state) => ({
      isFree: state.isFree === "true" ? "" : "true",
    })),
}));

import { create } from "zustand";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "MALE" | "FEMALE";
  address: string;
  countryId: string;
  role: "ATTENDEE" | "ORGANIZER";
  avatar: string | null;
  createdAt: string;
}

interface State {
  accessToken: string | null;
  user: User | null;
  isInitializing: boolean;
}

interface Action {
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  setInitializing: (boolean: boolean) => void;
}

// ----- STORE
export const useAuthStore = create<Action & State>((set) => ({
  user: null,
  accessToken: null,
  isInitializing: true,

  setAuth: (token, user) => set({ accessToken: token, user }),
  clearAuth: () => set({ accessToken: null, user: null }),
  setInitializing: (boolean) => set({ isInitializing: boolean }),
}));

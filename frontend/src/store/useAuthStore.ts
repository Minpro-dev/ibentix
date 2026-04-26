import { create } from "zustand";
import type { UserProfile } from "../types/userType";

interface State {
  accessToken: string | null;
  user: UserProfile | null;
  isInitializing: boolean;
}

interface Action {
  setAuth: (token: string, user: UserProfile) => void;
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

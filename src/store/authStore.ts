import { create } from "zustand";

interface IAuthState {
  isAuth: boolean;
  roles: string[];
  token: string | null;
  setAuth: (token: string, roles: string[]) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  isAuth: false,
  roles: [],
  token: null,
  setAuth: (token, roles) => set({ isAuth: true, token, roles }),
  clearAuth: () => set({ isAuth: false, token: null, roles: [] }),
}));

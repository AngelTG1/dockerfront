import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  token: string;
  profile: any;
  isAuth: boolean;
};

type Actions = {
  setToken: (token: string) => void;
  setProfile: (profile: any) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: "",
      profile: "",
      isAuth: false,
      setToken: (token: string) => set(() => ({ token, isAuth: true })),
      setProfile: (profile: string) => set(() => ({ profile })),
      logout: () => set(() => ({ token: "", isAuth: false, profile: null })),
    }),
    {
      name: "auth-storage",
    }
  )
);

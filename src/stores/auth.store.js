// src/stores/auth.store.js

import { create } from "zustand";

const useAuthStore = create((set) => ({
  accessToken: null,
  user: null,
  status: "checking", // checking |authenticated | guest
  setAccessToken: (accessToken) => {
    set({ accessToken });
  },
  setUser: (user) => {
    set({ user });
  },
  setSession: ({ accessToken, user }) => {
    set({
      accessToken,
      user,
      status: "authenticated",
    });
  },
  clearSession: () => {
    set({
      accessToken: null,
      user: null,
      status: "guest",
    });
  },
}));

export default useAuthStore;

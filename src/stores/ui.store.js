import { create } from "zustand";

const useUiStore = create((set, get) => ({
  pendingRequests: 0, // total equest
  startRequest: () => {
    set({
      pendingRequests: get().pendingRequests + 1,
    });
  },
  finisheRequest: () => {
    set({
      pendingRequests: Math.max(0, get().pendingRequests - 1), // don't let than 0
    });
  },
}));

export default useUiStore;

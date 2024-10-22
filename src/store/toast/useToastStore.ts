import { create } from "zustand";
import { ToastState } from "./types";

export const useToastStore = create<ToastState>(set => ({
  message: "",
  isVisible: false,
  showToast: message => {
    set({ message, isVisible: true });
    setTimeout(() => {
      set({ isVisible: false });
    }, 2000);
  },
  hideToast: () => {
    set({ isVisible: false });
  },
}));

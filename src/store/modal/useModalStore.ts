import { create } from "zustand";
import { ModalState } from "./types";

export const useModalStore = create<ModalState>(set => ({
  modals: [],
  showModal: (id: string) =>
    set(state => ({
      modals: [...state.modals.filter(modal => modal.id !== id), { id, isVisible: true }],
    })),
  hideModal: (id: string) =>
    set(state => ({
      modals: state.modals.map(modal => (modal.id === id ? { ...modal, isVisible: false } : modal)),
    })),
  toggleModal: (id: string) =>
    set(state => ({
      modals: state.modals.map(modal => (modal.id === id ? { ...modal, isVisible: !modal.isVisible } : modal)),
    })),
}));

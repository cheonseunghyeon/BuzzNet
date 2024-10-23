export interface ModalState {
  modals: { id: string; isVisible: boolean }[];
  showModal: (id: string) => void;
  hideModal: (id: string) => void;
  toggleModal: (id: string) => void;
}

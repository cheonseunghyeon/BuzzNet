export interface ModalProps {
  id: string;
}

export interface ModalLayoutProps {
  id: string;
  title: string;
  onConfirm: () => void;
  children: React.ReactNode;
}

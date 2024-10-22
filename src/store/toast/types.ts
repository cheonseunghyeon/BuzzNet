export interface ToastState {
  message: string;
  isVisible: boolean;
  showToast: (message: string) => void;
  hideToast: () => void;
}

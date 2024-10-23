import React from "react";
import { useModalStore } from "@/store/modal/useModalStore";

interface ModalLayoutProps {
  id: string;
  title: string;
  onConfirm: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<ModalLayoutProps> = ({ id, title, onConfirm, children }) => {
  const { modals, hideModal } = useModalStore();
  const modal = modals.find(m => m.id === id);

  if (!modal || !modal.isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
        <div className="flex justify-end space-x-4 mt-4">
          <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300" onClick={() => hideModal(id)}>
            취소
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Layout;

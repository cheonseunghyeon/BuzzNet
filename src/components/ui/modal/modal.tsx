"use client";

import { ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useModalAnimation } from "./useModalAnimation";
import CloseButton from "@/components/commons/CloseButton";

interface ModalProps {
  children: ReactNode;
  width?: string;
  height?: string;
}

export default function Modal({ children, width = "max-w-[720px]", height = "h-auto" }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isVisible, handleClose } = useModalAnimation();

  const closeModal = () => handleClose(() => router.back());

  return createPortal(
    <div
      onClick={e => {
        if (e.target === modalRef.current) {
          closeModal();
        }
      }}
      ref={modalRef}
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white p-8 rounded-xl shadow-lg border border-gray-200 relative mx-auto transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-90"
        } ${width} ${height}`}
      >
        <CloseButton onClick={closeModal} />
        <div className="p-4 border-t bg-blue-50 rounded-lg">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement,
  );
}

import { useToastStore } from "@/store/toast/useToastStore";
import React from "react";

const Toast: React.FC = () => {
  const { message, isVisible } = useToastStore();

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-300 to-blue-400 text-white text-xl font-semibold px-12 py-6 rounded-2xl shadow-lg text-center z-50 animate-fadeInOut">
      <span>{message}</span>
      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          10% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Toast;

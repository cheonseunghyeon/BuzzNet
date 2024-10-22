import { useToastStore } from "@/store/toast/useToastStore";
import React from "react";

const Toast: React.FC = () => {
  const { message, isVisible } = useToastStore();

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-2xl font-bold px-12 py-6 rounded-2xl shadow-2xl text-center z-50 animate-fadeInOut">
      {message}
      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            visibility: hidden;
          }
          10% {
            opacity: 1;
            visibility: visible;
          }
          90% {
            opacity: 1;
            visibility: visible;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }
        .animate-fadeInOut {
          animation: fadeInOut 2s;
        }
      `}</style>
    </div>
  );
};

export default Toast;

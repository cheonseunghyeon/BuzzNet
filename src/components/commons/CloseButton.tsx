import { CloseButtonProps } from "../types";

export default function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button
      className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors duration-300"
      onClick={onClick}
    >
      &times;
    </button>
  );
}

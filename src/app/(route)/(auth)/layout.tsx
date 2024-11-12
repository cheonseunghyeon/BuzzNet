import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <div className="w-full max-w-xl bg-white p-10 rounded-lg shadow-lg">{children}</div>
    </div>
  );
}

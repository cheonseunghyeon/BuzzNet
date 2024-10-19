import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-100 ">
      <div>{children}</div>;
    </div>
  );
}

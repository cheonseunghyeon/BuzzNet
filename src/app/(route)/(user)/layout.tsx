"use client";

import React from "react";
import Sidebar from "@/components/user/Sidebar";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { UserType } from "@/components/types";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore(state => state.user);

  const loggedInUser = user as UserType;

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex h-screen max-w-7xl mx-auto w-full">
        <Sidebar user={loggedInUser} />
        <main className="flex-grow max-w-6xl h-full p-8 ">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

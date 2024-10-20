"use client";

import React, { useState } from "react";
import loginuser from "../mock/user.json";
import { UserType } from "../types";
import Sidebar from "./components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [user] = useState<UserType[]>(loginuser);

  const loggedInUser = user[0];

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

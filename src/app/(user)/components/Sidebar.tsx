import React from "react";
import UserProfile from "./profile/UserProfile";
import UserStats from "./profile/UserStats";
import UserMenu from "./UserMenu";
import { UserType } from "@/components/types";

const Sidebar = ({ user }: { user: UserType }) => {
  return (
    <aside className="w-80 h-full bg-white text-black p-4 mt-12 shadow-md rounded-lg">
      <UserProfile user={user} />
      <UserStats user={user} />
      <UserMenu />
    </aside>
  );
};

export default Sidebar;

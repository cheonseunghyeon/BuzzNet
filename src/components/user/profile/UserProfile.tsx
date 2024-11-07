import { UserType } from "@/components/types";
import React from "react";

const UserProfile = ({ user }: { user: UserType }) => {
  return (
    <div className="flex flex-col items-center mb-6 mt-8">
      {user.imageUrl ? (
        <img src={user.imageUrl} alt={user.name} className="w-32 h-32 rounded-full mb-4" />
      ) : (
        <div className="w-32 h-32 rounded-full mb-4 bg-black" />
      )}

      <h2 className="text-2xl font-semibold">{user.name}</h2>
    </div>
  );
};

export default UserProfile;

import { UserType } from "@/components/types";
import React from "react";

const UserStats = ({ user }: { user: UserType }) => {
  console.log(user);
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="border border-gray-400 p-4 rounded-lg flex flex-col items-center justify-center">
          {/* <span className="text-2xl font-bold">{user.posts || 0}</span> */}
          <span className="text-2xl font-bold">0</span>
          <span>Posts</span>
        </div>

        <div className="border border-gray-400 p-4 rounded-lg flex flex-col items-center justify-center">
          {/* <span className="text-2xl font-bold">{user.likes || 0}</span> */}
          <span className="text-2xl font-bold">0</span>
          <span>Likes</span>
        </div>

        <div className="border border-gray-400  p-4 rounded-lg flex flex-col items-center justify-center col-span-2">
          {/* <span className="text-2xl font-bold">{user.comments || 0}</span> */}
          <span className="text-2xl font-bold">0</span>
          <span>Comments</span>
        </div>
      </div>
    </>
  );
};

export default UserStats;

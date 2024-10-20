"use client";
import React, { useState } from "react";
import users from "../../../../mock/user.json";
import { UserType } from "../../../../types";
import SelectedUser from "../../../components/SelectedUser";
import UserList from "../../../components/UserList";
import Link from "next/link";

const Follower = () => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  return (
    <div className="max-w-6xl pt-4 mx-auto">
      <div className="bg-white shadow-md rounded-lg mb-4 p-4">
        {selectedUser ? (
          <SelectedUser user={selectedUser} />
        ) : (
          <div className="p-4 rounded-lg bg-gray-100 mb-4 min-h-[80px]" />
        )}

        <div className="flex justify-between items-center px-28">
          <Link href="/mypage/following">
            <span className="text-lg font-bold text-gray-500 cursor-pointer transition duration-200 ease-in-out transform hover:text-blue-500 hover:text-xl">
              Following
            </span>
          </Link>
          <Link href="/mypage/follower">
            <span className="text-xl font-bold text-black cursor-pointer transition duration-200 ease-in-out transform hover:text-blue-500 hover:text-xl ">
              Follower
            </span>
          </Link>
        </div>

        <hr className="my-4 border-gray-300 border-t-2" />

        <UserList users={users} onUserClick={setSelectedUser} />
      </div>
    </div>
  );
};

export default Follower;

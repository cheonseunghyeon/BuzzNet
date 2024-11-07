import React from "react";
import { UserType } from "@/components/types";
import Link from "next/link";

const UserList = ({ users }: { users: UserType[] }) => (
  <div className="mt-4 space-y-2">
    {users.map(user => (
      <Link href={`/profiles/${user.uid}`} key={user.uid}>
        <div className="hover:bg-gray-100 p-4 rounded-lg flex items-center justify-between space-x-4 cursor-pointer">
          <div className="flex items-center space-x-4">
            {user.imageUrl ? (
              <img src={user.imageUrl} alt={`${user.name}'s profile`} className="w-14 h-14 rounded-full " />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gray-200" />
            )}

            <div>
              <span className="font-bold text-lg">{user.name}</span>
              <div className="text-sm text-gray-600">
                <p>Posts: {user.bio}</p>
              </div>
            </div>
          </div>
          <Link href={`/mypage/message`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
              Message
            </button>
          </Link>
        </div>
      </Link>
    ))}
  </div>
);

export default UserList;

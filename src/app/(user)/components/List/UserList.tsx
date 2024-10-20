import React from "react";
import { UserType } from "@/app/types";

const UserList = ({ users, onUserClick }: { users: UserType[]; onUserClick: (user: UserType) => void }) => (
  <div className="mt-4 space-y-2">
    {users.map(user => (
      <div
        key={user.id}
        className="hover:bg-gray-100 p-4 rounded-lg flex items-center justify-between space-x-4 cursor-pointer"
        onClick={() => onUserClick(user)}
      >
        <div className="flex items-center space-x-4">
          <img src={user.profileImage} alt={user.name} className="w-14 h-14 rounded-full" />
          <div>
            <span className="font-bold text-lg">{user.name}</span>
            <div className="text-sm text-gray-600">
              <p>Posts: {user.posts}</p>
            </div>
          </div>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
          Message
        </button>
      </div>
    ))}
  </div>
);

export default UserList;

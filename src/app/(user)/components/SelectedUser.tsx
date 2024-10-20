import React from "react";
import { UserType } from "@/app/types";

const SelectedUser = ({ user }: { user: UserType }) => (
  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-4">
    <div className="flex items-center space-x-4">
      <img src={user.profileImage} alt={user.name} className="w-16 h-16 rounded-full" />
      <div>
        <h2 className="font-bold text-lg">{user.name}</h2>
        <p className="text-gray-600 text-sm">Posts: {user.posts}</p>
      </div>
    </div>
    <div className="flex space-x-4">
      <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200">
        Following
      </button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
        Message
      </button>
    </div>
  </div>
);

export default SelectedUser;

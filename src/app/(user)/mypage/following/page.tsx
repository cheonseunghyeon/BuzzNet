"use client";
import React, { useState } from "react";
import users from "../../../mock/user.json";
import { UserType } from "../../../types";

const Following = () => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const handleUserClick = (user: UserType) => {
    setSelectedUser(user);
  };

  return (
    <div className="max-w-6xl pt-4 mx-auto">
      <div className="bg-white shadow-md rounded-lg mb-4 p-4">
        {selectedUser ? (
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-4">
            <div className="flex items-center space-x-4">
              <img src={selectedUser.profileImage} alt={selectedUser.name} className="w-16 h-16 rounded-full" />
              <div>
                <h2 className="font-bold text-lg">{selectedUser.name}</h2>
                <p className="text-gray-600 text-sm">Posts: {selectedUser.posts}</p>
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
        ) : (
          <div className="p-4 rounded-lg mb-4 min-h-24"></div>
        )}

        <div className="flex justify-between items-center px-40">
          <span className="text-lg font-bold">Following</span>
          <span className="text-lg font-bold">Follower</span>
        </div>

        <hr className="my-4 border-gray-300 border-t-2" />

        <div className="mt-4 space-y-2">
          {users.map((user: UserType) => (
            <div
              key={user.id}
              className="hover:bg-gray-100 p-4 rounded-lg flex items-center justify-between space-x-4 cursor-pointer"
              onClick={() => handleUserClick(user)}
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
      </div>
    </div>
  );
};

export default Following;

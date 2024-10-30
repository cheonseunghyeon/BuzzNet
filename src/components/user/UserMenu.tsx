import Link from "next/link";
import React from "react";
import { FaHome, FaList, FaBell, FaEnvelope, FaUserFriends } from "react-icons/fa";

const UserMenu = () => {
  return (
    <ul className="mt-4 space-y-6">
      <li>
        <Link
          href="/main"
          className="flex items-center space-x-4 text-lg hover:bg-gray-200 p-3 rounded-lg transition-all duration-200"
        >
          <FaHome className="w-6 h-6" />
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link
          href="/mypage"
          className="flex items-center space-x-4 text-lg hover:bg-gray-200 p-3 rounded-lg transition-all duration-200"
        >
          <FaList className="w-6 h-6" />
          <span>Lists</span>
        </Link>
      </li>
      <li>
        <Link
          href="/mypage/notification"
          className="flex items-center space-x-4 text-lg hover:bg-gray-200 p-3 rounded-lg transition-all duration-200"
        >
          <FaBell className="w-6 h-6" />
          <span>Notifications</span>
        </Link>
      </li>
      <li>
        <Link
          href="/mypage/message"
          className="flex items-center space-x-4 text-lg hover:bg-gray-200 p-3 rounded-lg transition-all duration-200"
        >
          <FaEnvelope className="w-6 h-6" />
          <span>Messages</span>
        </Link>
      </li>
      <li>
        <Link
          href="/mypage/following"
          className="flex items-center space-x-4 text-lg hover:bg-gray-200 p-3 rounded-lg transition-all duration-200"
        >
          <FaUserFriends className="w-6 h-6" />
          <span>Following</span>
        </Link>
      </li>
    </ul>
  );
};

export default UserMenu;

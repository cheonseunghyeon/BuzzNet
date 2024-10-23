"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth/useAuthStore";

const Header = () => {
  const { user, isLogin, logout, checkLoginStatus } = useAuthStore();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (isLogin === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <header className="bg-white p-4">
      <nav>
        <ul className="flex justify-center space-x-6">
          <li>
            <Link href="/main">Main</Link>
          </li>
          <li>
            <Link href="/mypage">Mypage</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>

          {isLogin && user ? (
            <>
              <li>
                <Link href="/mypage"> {user.name}</Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                  }}
                >
                  로그아웃
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

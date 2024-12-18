"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, isLogin, logout, checkLoginStatus } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  if (isLogin === undefined) {
    return <div>Loading...</div>;
  }

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

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
                <button onClick={handleLogout}>로그아웃</button>
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

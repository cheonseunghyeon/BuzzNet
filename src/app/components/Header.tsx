import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white p-4">
      <nav>
        <ul className="flex justify-center space-x-6">
          <li>
            <Link href="/main">Main</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/signup">Signup</Link>
          </li>
          <li>
            <Link href="/mypage">Mypage</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

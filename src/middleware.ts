import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken");

  // 로그인과 회원가입 페이지는 토큰 없이 접근 가능
  if (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup") {
    return NextResponse.next();
  }

  // 토큰이 없는 경우 리디렉션
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/main",
    "/detail/:path*",
    "/mypage",
    "/profile",
    "/mypage/notification",
    "/mypage/message",
    "/mypage/following",
  ],
};

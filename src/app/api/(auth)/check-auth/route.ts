import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/firebase/admin"; // Firebase Admin SDK의 인증 객체 가져오기

export async function GET(req: NextRequest) {
  const tokenCookie = req.cookies.get("accessToken"); // 쿠키 객체를 가져옴

  if (!tokenCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = tokenCookie.value;

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return NextResponse.json({
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || "",
    });
  } catch (error) {
    console.error("Error during token verification:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

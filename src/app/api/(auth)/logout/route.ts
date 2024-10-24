import { NextRequest, NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.set("accessToken", "", { maxAge: -1 });
  return response;
}

import { NextResponse } from "next/server";
import { db } from "@/firebase/init";
import { doc, updateDoc } from "firebase/firestore";

export async function PUT(request: Request, { params }: { params: { postId: string } }) {
  const { postId } = params;
  const { content } = await request.json();

  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, { content });

    return NextResponse.json({ message: "게시물이 성공적으로 업데이트되었습니다." }, { status: 200 });
  } catch (error) {
    console.error("게시물 업데이트 오류:", error);
    return NextResponse.json({ message: "게시물 업데이트 오류" }, { status: 500 });
  }
}

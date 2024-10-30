import { NextResponse } from "next/server";
import { db } from "@/firebase/init";
import { doc, deleteDoc } from "firebase/firestore";

export async function DELETE(request: Request, { params }: { params: { postId: string } }) {
  const { postId } = params;

  try {
    const postRef = doc(db, "posts", postId);
    await deleteDoc(postRef);

    return NextResponse.json({ message: "게시물이 성공적으로 삭제되었습니다." }, { status: 200 });
  } catch (error) {
    console.error("게시물 삭제 오류:", error);
    return NextResponse.json({ message: "게시물 삭제 오류" }, { status: 500 });
  }
}

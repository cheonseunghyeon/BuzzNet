import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase/init";
import { doc, deleteDoc } from "firebase/firestore";

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const postId = url.pathname.split("/")[3];
    const commentId = url.pathname.split("/")[5];

    if (!postId || !commentId) {
      return NextResponse.json({ message: "Missing postId or commentId" }, { status: 400 });
    }

    const commentRef = doc(db, "posts", postId, "comments", commentId);
    await deleteDoc(commentRef);

    return NextResponse.json({ message: "댓글이 성공적으로 삭제되었습니다." }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error deleting comment:", error);

    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json({ message: "Failed to delete comment", error: errorMessage }, { status: 500 });
  }
}

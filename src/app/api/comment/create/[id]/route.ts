import { NextResponse } from "next/server";
import { db } from "@/firebase/init";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const postId = params.id;

  try {
    const { content, uid, displayName, userImageUrl } = await request.json();

    const newCommentData = {
      content,
      createdAt: Timestamp.now(),
      author: {
        uid,
        displayName: displayName || "Anonymous",
        userImageUrl: userImageUrl || "/default-profile.png",
      },
    };

    await addDoc(collection(db, "posts", postId, "comments"), newCommentData);

    return NextResponse.json({ message: "댓글이 성공적으로 추가되었습니다." }, { status: 200 });
  } catch (error) {
    console.error("댓글 작성 중 오류:", error);
    return NextResponse.json({ message: "댓글 작성 중 오류가 발생했습니다." }, { status: 500 });
  }
}

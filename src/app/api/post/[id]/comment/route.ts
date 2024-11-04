import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase/init";
import { collection, query, orderBy, limit as firestoreLimit, getDocs, addDoc, Timestamp } from "firebase/firestore";

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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");

  try {
    const commentsRef = collection(db, "posts", id, "comments");
    const commentsQuery = limit
      ? query(commentsRef, orderBy("createdAt", "asc"), firestoreLimit(Number(limit)))
      : query(commentsRef, orderBy("createdAt", "asc"));

    const querySnapshot = await getDocs(commentsQuery);
    const comments = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        content: data.content,
        createdAt: data.createdAt.toDate(),
        author: {
          uid: data.author.uid,
          displayName: data.author.displayName,
          userImageUrl: data.author.userImageUrl,
        },
      };
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ message: "Failed to fetch comments" }, { status: 500 });
  }
}

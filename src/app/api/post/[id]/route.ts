import { NextResponse } from "next/server";
import { db } from "@/firebase/init";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { content } = await request.json();

  try {
    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, { content });

    return NextResponse.json({ message: "게시물이 성공적으로 업데이트되었습니다." }, { status: 200 });
  } catch (error) {
    console.error("게시물 업데이트 오류:", error);
    return NextResponse.json({ message: "게시물 업데이트 오류" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const postRef = doc(db, "posts", id);
    await deleteDoc(postRef);

    return NextResponse.json({ message: "게시물이 성공적으로 삭제되었습니다." }, { status: 200 });
  } catch (error) {
    console.error("게시물 삭제 오류:", error);
    return NextResponse.json({ message: "게시물 삭제 오류" }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const data = postSnap.data();
    return NextResponse.json({
      id: postSnap.id,
      author: data.author,
      content: data.content,
      createdAt: data.createdAt.toDate(),
      imageUrl: data.imageUrl,
      likes: data.likes,
      comments: data.comments,
      shares: data.shares,
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Failed to fetch post data" }, { status: 500 });
  }
}

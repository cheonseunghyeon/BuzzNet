import { NextResponse } from "next/server";
import { db } from "@/firebase/init";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

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

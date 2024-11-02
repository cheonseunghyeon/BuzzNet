import { NextResponse } from "next/server";
import { db } from "@/firebase/init";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export async function POST(req: Request) {
  const { content, imageUrl, author } = await req.json();

  try {
    const postRef = await addDoc(collection(db, "posts"), {
      content,
      imageUrl,
      createdAt: Timestamp.fromDate(new Date()),
      author,
      likes: [],
      comments: 0,
      shares: 0,
    });

    return NextResponse.json({ id: postRef.id, message: "Post created successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

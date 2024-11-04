import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase/init";
import { collection, query, orderBy, limit as firestoreLimit, getDocs } from "firebase/firestore";

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

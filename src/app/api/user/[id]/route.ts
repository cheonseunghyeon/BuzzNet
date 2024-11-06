import { db } from "@/firebase/init";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const data = docSnap.data();
    return NextResponse.json({
      name: data?.name,
      imageUrl: data?.imageUrl,
      bio: data?.bio,
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Failed to fetch post data" }, { status: 500 });
  }
}

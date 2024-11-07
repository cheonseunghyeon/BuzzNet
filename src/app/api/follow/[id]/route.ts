import { NextResponse } from "next/server";
import { collection, addDoc, deleteDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/init";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { followerId } = await req.json();
    const followedId = params.id;

    await addDoc(collection(db, "followers"), { followerId, followedId });
    await addDoc(collection(db, "following"), { followerId, followingId: followedId });

    return NextResponse.json({ message: "팔로우 성공" }, { status: 200 });
  } catch (error) {
    console.error("Error following user:", error);
    return NextResponse.json({ message: "팔로우 중 오류 발생" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { followerId } = await req.json();
    const followedId = params.id;

    const followersQuery = query(
      collection(db, "followers"),
      where("followerId", "==", followerId),
      where("followedId", "==", followedId),
    );
    const followersSnapshot = await getDocs(followersQuery);
    followersSnapshot.forEach(async doc => {
      await deleteDoc(doc.ref);
    });

    const followingQuery = query(
      collection(db, "following"),
      where("followerId", "==", followerId),
      where("followingId", "==", followedId),
    );
    const followingSnapshot = await getDocs(followingQuery);
    followingSnapshot.forEach(async doc => {
      await deleteDoc(doc.ref);
    });

    return NextResponse.json({ message: "언팔로우 성공" }, { status: 200 });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    return NextResponse.json({ message: "언팔로우 중 오류 발생" }, { status: 500 });
  }
}

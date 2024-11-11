import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase/init";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
  const { user1Id, user2Id } = await req.json();

  if (!user1Id || !user2Id) {
    return NextResponse.json({ error: "Invalid user IDs" }, { status: 400 });
  }

  try {
    const chatRef = collection(db, "chats");
    const chatQuery = query(chatRef, where("userIds", "==", [user1Id, user2Id].sort()));
    const chatSnapshot = await getDocs(chatQuery);

    if (chatSnapshot.empty) {
      const newChatRef = await addDoc(chatRef, {
        userIds: [user1Id, user2Id].sort(),
        createdAt: new Date(),
        lastMessage: "",
      });
      return NextResponse.json({ chatRoomId: newChatRef.id }, { status: 201 });
    } else {
      return NextResponse.json({ chatRoomId: chatSnapshot.docs[0].id });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to get or create chat room" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // userId가 포함된 모든 채팅방을 조회하는 쿼리
    const chatRef = collection(db, "chats");
    const chatQuery = query(chatRef, where("userIds", "array-contains", userId));
    const chatSnapshot = await getDocs(chatQuery);

    const chatRooms = chatSnapshot.docs.map(doc => ({
      chatRoomId: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ chatRooms }, { status: 200 });
  } catch (error) {
    console.error("Error fetching chat rooms:", error);
    return NextResponse.json({ error: "Failed to fetch chat rooms" }, { status: 500 });
  }
}

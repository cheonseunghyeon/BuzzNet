import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase/init";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
  const { user1Id, user2Id, senderId, text } = await req.json();

  if (!user1Id || !user2Id || !senderId || !text) {
    return NextResponse.json({ error: "Invalid message data" }, { status: 400 });
  }

  try {
    const chatRef = collection(db, "chats");
    const chatQuery = query(chatRef, where("userIds", "==", [user1Id, user2Id].sort()));
    const chatSnapshot = await getDocs(chatQuery);

    let chatId;

    if (chatSnapshot.empty) {
      const newChatRef = await addDoc(chatRef, {
        userIds: [user1Id, user2Id].sort(),
        createdAt: new Date(),
        lastMessage: text,
      });
      chatId = newChatRef.id;
    } else {
      chatId = chatSnapshot.docs[0].id;
    }

    const messageRef = collection(db, "chats", chatId, "messages");
    await addDoc(messageRef, {
      senderId,
      text,
      createdAt: new Date(),
    });

    return NextResponse.json({ chatRoomId: chatId, message: "Message sent successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error handling message:", error);
    return NextResponse.json({ error: "Failed to handle message" }, { status: 500 });
  }
}

import { db } from "@/firebase/init";
import { collection, addDoc, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore";
import { MessageType } from "./type";

export const getOrCreateChatRoom = async (user1Id: string, user2Id: string) => {
  const chatRef = collection(db, "chats");
  const chatQuery = query(chatRef, where("userIds", "==", [user1Id, user2Id].sort()));

  const chatSnapshot = await getDocs(chatQuery);
  if (chatSnapshot.empty) {
    const newChatRef = await addDoc(chatRef, {
      userIds: [user1Id, user2Id].sort(),
      createdAt: new Date(),
      lastMessage: "",
    });
    return newChatRef.id;
  } else {
    return chatSnapshot.docs[0].id;
  }
};

export const sendMessage = async (chatId: string, senderId: string, text: string) => {
  const messageRef = collection(db, "chats", chatId, "messages");
  await addDoc(messageRef, {
    senderId,
    text,
    createdAt: new Date(),
  });
};

export const subscribeToMessages = (chatId: string, callback: (messages: MessageType[]) => void) => {
  const messageRef = collection(db, "chats", chatId, "messages");
  const messageQuery = query(messageRef, orderBy("createdAt", "asc"));

  return onSnapshot(messageQuery, snapshot => {
    const messages: MessageType[] = snapshot.docs.map(doc => ({
      id: doc.id,
      senderId: doc.data().senderId,
      text: doc.data().text,
      createdAt: doc.data().createdAt.toDate(),
    }));
    callback(messages);
  });
};

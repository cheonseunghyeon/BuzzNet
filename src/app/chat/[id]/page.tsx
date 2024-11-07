"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { sendMessage, subscribeToMessages } from "@/lib/chat/chatAPI";
import { useParams } from "next/navigation";
import { MessageType } from "@/lib/chat/type";

const ChatRoom = () => {
  const params = useParams();
  const chatId = params?.id as string;
  const user = useAuthStore(state => state.user);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!chatId) return;
    const unsubscribe = subscribeToMessages(chatId as string, msgs => {
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [chatId]);

  const handleSendMessage = async () => {
    console.log(newMessage);
    if (!user || !chatId) return;

    try {
      await sendMessage(chatId as string, user.uid, newMessage.trim());
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="max-w-full pt-4 mx-auto bg-black">
      <div className="bg-white shadow-md rounded-lg mb-4 p-4">
        <h1 className="text-2xl font-semibold mb-4">채팅방221</h1>
        <div className="h-64 overflow-y-auto mb-4">
          {messages.map(message => (
            <div key={message.id} className={`p-2 ${message.senderId === user?.uid ? "text-right" : "text-left"}`}>
              <p
                className={`inline-block p-2 rounded-lg ${
                  message.senderId === user?.uid ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                {message.text}
              </p>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="메시지를 입력하세요"
            className="flex-1 p-2 border rounded-lg"
          />
          <button onClick={handleSendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;

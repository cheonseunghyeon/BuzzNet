"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth/useAuthStore";
import Link from "next/link";
import { useAllUser } from "@/lib/user/hooks/useAllluser";

type ChatRoomType = {
  chatRoomId: string;
  lastMessage: string;
  userIds: string[];
};

export const fetchChatRooms = async (userId: string) => {
  const response = await fetch(`/api/chat?userId=${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch chat rooms");
  }

  const data = await response.json();
  return data.chatRooms;
};

const ChatRoomList = () => {
  const user = useAuthStore(state => state.user);
  const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);
  const [otherUserIds, setOtherUserIds] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/chat?userId=${user.uid}`);
        const data = await response.json();
        setChatRooms(data.chatRooms);

        const ids = data.chatRooms
          .map((room: ChatRoomType) => room.userIds.find(id => id !== user.uid))
          .filter(Boolean) as string[];

        setOtherUserIds(ids);
      } catch (error) {
        console.error("Failed to fetch chat rooms:", error);
      }
    };

    fetchData();
  }, [user]);

  const { data: followersData = [] } = useAllUser(otherUserIds);

  console.log("Followers Data:", followersData);
  console.log("Other User IDs:", otherUserIds);

  const getUserName = (userId: string) => {
    const user = followersData.find(follower => follower.uid === userId);
    return user ? user.name : "알 수 없음";
  };

  if (!user) return <p>로그인이 필요합니다.</p>;

  return (
    <div className="max-w-6xl pt-4 mx-auto">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h1 className="text-2xl font-semibold mb-4">채팅방 리스트</h1>
        <ul>
          {chatRooms.map(chatRoom => {
            const otherUserId = chatRoom.userIds.find(id => id !== user.uid);
            return (
              <li key={chatRoom.chatRoomId} className="mb-2">
                <Link href={`/chat/${chatRoom.chatRoomId}`} className="block p-2 border rounded-lg hover:bg-gray-100">
                  <p>채팅 상대: {otherUserId ? getUserName(otherUserId) : "알 수 없음"}</p>
                  <p>최근 메시지: {chatRoom.lastMessage}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ChatRoomList;

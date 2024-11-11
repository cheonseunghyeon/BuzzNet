"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth/useAuthStore";
import Link from "next/link";
import { useAllUser } from "@/lib/user/hooks/useAllluser";
import { useChatList } from "@/lib/chat/hooks/useChatList";
import { ChatRoomType } from "@/lib/chat/type";
import { getUserName } from "@/utils/getUserName";

const ChatRoomList = () => {
  const user = useAuthStore(state => state.user);
  const [otherUserIds, setOtherUserIds] = useState<string[]>([]);
  const { data: chatRooms, isLoading, error } = useChatList(user?.uid || "");
  const { data: UserData = [] } = useAllUser(otherUserIds);

  useEffect(() => {
    if (!user || !Array.isArray(chatRooms)) return;

    const ids = chatRooms
      .map((room: ChatRoomType) => room.userIds.find(id => id !== user.uid))
      .filter(Boolean) as string[];

    setOtherUserIds(ids);
  }, [user, chatRooms]);

  if (!user) return <p>로그인이 필요합니다.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading chat list</p>;

  return (
    <div className="max-w-6xl pt-4 mx-auto">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h1 className="text-2xl font-semibold mb-4">채팅방 리스트</h1>
        <ul>
          {chatRooms.map((chatRoom: ChatRoomType) => {
            const otherUserId = chatRoom.userIds.find(id => id !== user.uid);
            return (
              <li key={chatRoom.chatRoomId} className="mb-2">
                <Link href={`/chat/${chatRoom.chatRoomId}`} className="block p-2 border rounded-lg hover:bg-gray-100">
                  <p>채팅 상대: {otherUserId ? getUserName(otherUserId, UserData) : "알 수 없음"}</p>
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

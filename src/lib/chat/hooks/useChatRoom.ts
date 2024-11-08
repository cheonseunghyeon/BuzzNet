import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/toast/useToastStore";

export function useGetOrCreateChatRoom() {
  const showToast = useToastStore(state => state.showToast);
  const queryClient = useQueryClient();

  return useMutation<string, Error, { user1Id: string; user2Id: string }>({
    mutationFn: async ({ user1Id, user2Id }) => {
      const response = await fetch(`/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user1Id, user2Id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "채팅방 생성에 실패했습니다.");
      }

      const data = await response.json();
      return data.chatRoomId;
    },
    onSuccess: chatRoomId => {
      showToast("채팅방 생성에 성공했습니다.");
      console.log("생성된 채팅방 ID:", chatRoomId);
      queryClient.invalidateQueries({ queryKey: ["chatRoom"] });
    },
    onError: error => {
      console.error("채팅방 생성 중 오류:", error.message);
      showToast("채팅방 생성 중 오류가 발생했습니다.");
    },
  });
}

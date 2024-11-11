import { useQuery } from "@tanstack/react-query";
import { getChatList } from "../chatAPI";

export function useChatList(userId: string) {
  return useQuery({
    queryKey: ["userId", userId],
    queryFn: () => getChatList(userId),
    staleTime: 1000 * 60 * 5,
  });
}

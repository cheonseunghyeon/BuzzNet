import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/toast/useToastStore";
import { unfollowUser } from "../followAPI";

export function useUnfollow() {
  const showToast = useToastStore(state => state.showToast);
  const queryClient = useQueryClient();

  return useMutation<void, Error, { followerId: string; followedId: string }>({
    mutationFn: ({ followerId, followedId }) => unfollowUser(followerId, followedId),
    onSuccess: () => {
      showToast("팔로우에 성공했습니다.");
      queryClient.invalidateQueries({ queryKey: ["isFollowing"] });
    },
    onError: error => {
      console.error("팔로우 중 오류:", error.message);
      showToast("팔로우 중 오류가 발생했습니다.");
    },
  });
}

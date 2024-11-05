import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../postAPI";

export function useDeletePost(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      // 지정된 쿼리 키 데이터를무효화 하고 새 요청 시 최신 상태로 유지
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
    onError: error => {
      console.error("Error deleting post:", error);
      alert("삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
}

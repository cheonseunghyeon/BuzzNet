import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../commentAPI";

export function useDeleteComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: { commentId: string }) => deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error: Error) => {
      console.error("댓글 삭제 중 오류:", error.message);
    },
  });
}

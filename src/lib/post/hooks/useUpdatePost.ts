import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../postAPI";

interface UpdatePostParams {
  postId: string;
  content: string;
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }: UpdatePostParams) => updatePost(postId, content),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
    onError: error => {
      console.error("Error updating post:", error);
      alert("업데이트 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
}

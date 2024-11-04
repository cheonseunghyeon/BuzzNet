import { useMutation } from "@tanstack/react-query";
import { addComment } from "../commentAPI";
import { AddCommentParams } from "../types";
import { useToastStore } from "@/store/toast/useToastStore";
import { useRouter } from "next/navigation";

export function useAddComment() {
  const showToast = useToastStore(state => state.showToast);
  const router = useRouter();

  return useMutation<void, Error, AddCommentParams>({
    mutationFn: addComment,
    onSuccess: data => {
      showToast("댓글이 성공적으로 작성되었습니다.");
      console.log(data);
      router.back();
    },
    onError: error => {
      console.error("댓글 작성 중 오류:", error.message);
    },
  });
}

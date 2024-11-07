import { useMutation } from "@tanstack/react-query";
import { addPost } from "../postAPI";
import { useToastStore } from "@/store/toast/useToastStore";
import { useRouter } from "next/navigation";
import { PostType } from "../types";

export function useAddPost() {
  const showToast = useToastStore(state => state.showToast);
  const router = useRouter();

  return useMutation<void, Error, PostType>({
    mutationFn: addPost,
    onSuccess: () => {
      showToast("게시물이 성공적으로 작성되었습니다.");
      router.back();
    },
    onError: error => {
      console.error("게시물 작성 중 오류:", error.message);
      showToast("게시물 작성 중 오류가 발생했습니다.");
    },
  });
}

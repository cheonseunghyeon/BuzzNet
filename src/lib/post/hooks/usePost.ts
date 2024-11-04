import { useQuery } from "@tanstack/react-query";
import { getPost } from "../postAPI";

export function usePost(postId: string) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
    staleTime: 1000 * 60 * 5,
  });
}

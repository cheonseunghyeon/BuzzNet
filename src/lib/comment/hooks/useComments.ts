import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "../commentAPI";

export function useComments(postId: string, limit: number) {
  return useQuery({
    queryKey: ["comments", postId, limit],
    queryFn: () => fetchComments(postId, limit),
    staleTime: 1000 * 60 * 5,
  });
}

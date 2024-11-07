import { useQuery } from "@tanstack/react-query";
import { checkIfFollowing } from "../followAPI";

export function useCheckIfFollow(followerId: string, followedId: string) {
  return useQuery({
    queryKey: ["isFollowing", followerId, followedId],
    queryFn: () => checkIfFollowing(followerId, followedId),
    staleTime: 1000 * 60 * 5,
  });
}

import { useQuery } from "@tanstack/react-query";
import { userAPI } from "../userAPI";

export function useUser(uid: string) {
  return useQuery({
    queryKey: ["user", uid],
    queryFn: () => userAPI(uid),
    staleTime: 1000 * 60 * 5,
  });
}

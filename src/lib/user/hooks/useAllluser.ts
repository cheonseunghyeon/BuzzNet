import { useQuery } from "@tanstack/react-query";
import { userAPI } from "../userAPI";

export function useAllUser(uids: string[]) {
  return useQuery({
    queryKey: ["users", uids],
    queryFn: async () => {
      const usersData = await Promise.all(uids.map(uid => userAPI(uid)));
      return usersData.filter(user => user !== undefined);
    },
    enabled: uids.length > 0,
    staleTime: 1000 * 60 * 5,
  });
}

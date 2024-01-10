import { fetchUser, hasToken } from "services/api";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!hasToken()) {
        return null;
      }

      const res = await fetchUser();
      return res.data;
    },
    staleTime: 60 * 1000,
    retry: 3,
  });

  return userQuery;
}

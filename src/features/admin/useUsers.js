import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiUser";

export function useUsers() {
  const { isLoading, data, error, count } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  return { isLoading, data, error, count };
}

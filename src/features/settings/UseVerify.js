import { useQuery } from "@tanstack/react-query";
import { verify } from "../../services/apiVerify";

export function useVerify() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["photo_verification"],
    queryFn: () => verify(),
  });

  return { data, isLoading, error };
}

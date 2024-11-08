import { useQuery } from "@tanstack/react-query";
import { getCurrentUserBuy } from "../../services/apibuy";
import { useSearchParams } from "react-router-dom";

export function useBuy() {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: buy, count } = {},
    error,
  } = useQuery({
    queryKey: ["buy", page],
    queryFn: () => getCurrentUserBuy({ page }),
  });
  return { isLoading, buy, count, error };
}

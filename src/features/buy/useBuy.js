import { useQuery } from "@tanstack/react-query";
import { getCurrentUserBuy } from "../../services/apibuy";

export function useBuy() {
	const { isLoading, data, error } = useQuery({
		queryKey: ["buy"],
		queryFn: getCurrentUserBuy,
	});
	return { isLoading, data, error };
}

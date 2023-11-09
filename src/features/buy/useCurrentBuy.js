import { useQuery } from "@tanstack/react-query";
import { getCurrentBuy } from "../../services/apibuy";

export function useCurrentBuy() {
	const { isLoading, data } = useQuery({
		queryKey: ["buy"],
		queryFn: getCurrentBuy,
	});
	return { isLoading, data };
}

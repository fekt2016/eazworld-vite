import { useQuery } from "@tanstack/react-query";
import { getBuy } from "../../services/apibuy";

export function useAllBuy() {
	const { isLoading, data, error, count } = useQuery({
		queryKey: ["buy"],
		queryFn: getBuy,
	});
	return { isLoading, data, error, count };
}

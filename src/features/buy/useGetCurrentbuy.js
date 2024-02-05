import { useQuery } from "@tanstack/react-query";
import { getCurrentBuy } from "../../services/apibuy";

export function useGetCurrentBuy(id) {
	const { isLoading, data } = useQuery({
		queryKey: ["buy"],
		queryFn: () => getCurrentBuy(id),
	});

	return { isLoading, data };
}

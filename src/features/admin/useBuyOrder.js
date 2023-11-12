import { useQuery } from "@tanstack/react-query";
import { getBuy } from "../../services/apibuy";

export function useBuyOrder() {
	const { isLoading, data, error } = useQuery({
		queryKey: ["buy"],
		queryFn: getBuy,
	});
	return { isLoading, data, error };
}

import { useQuery } from "@tanstack/react-query";
import { getRate } from "../../services/apiRate";

export function useRate() {
	const { isLoading, data, error } = useQuery({
		queryKey: ["rate"],
		queryFn: getRate,
	});
	return { isLoading, data, error };
}

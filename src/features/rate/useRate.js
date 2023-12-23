import { useQuery } from "@tanstack/react-query";
import { getRate } from "../../services/apiRate";

export function useRate() {
	const {
		isLoading,
		data: rate,
		error,
	} = useQuery({
		queryKey: ["rate"],
		queryFn: getRate,
	});
	return { isLoading, rate, error };
}

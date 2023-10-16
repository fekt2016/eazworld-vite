import { useQuery } from "@tanstack/react-query";
import { getCurrentUserSell } from "../../services/apiSell";

export function useSell() {
	const { isLoading, data, error } = useQuery({
		queryKey: ["sell"],
		queryFn: getCurrentUserSell,
	});

	return { isLoading, data, error };
}

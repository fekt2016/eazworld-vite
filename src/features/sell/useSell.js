import { useQuery } from "@tanstack/react-query";
import { getSell } from "../../services/apiSell";

export function useSell() {
	const { isLoading, data, error } = useQuery({
		queryKey: ["sell"],
		queryFn: getSell,
	});

	return { isLoading, data, error };
}

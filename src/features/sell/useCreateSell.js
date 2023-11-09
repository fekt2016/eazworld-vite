import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSell as apiSell } from "../../services/apiSell";
import toast from "react-hot-toast";

export function useCreateSell() {
	const queryClient = useQueryClient();
	const { mutate: createSell, isLoading: isCreating } = useMutation({
		mutationFn: (newSell) => apiSell(newSell),
		onSuccess: () => {
			toast.success("New order successfully created");
			queryClient.invalidateQueries({
				queryKey: ["sell"],
			});
		},
		onError: (err) => toast.error(err.message),
	});

	return { createSell, isCreating };
}

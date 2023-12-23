import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBuy } from "../../services/apibuy";
import { toast } from "react-hot-toast";

export function useUpdateBuy() {
	const queryClient = useQueryClient();

	const { mutate: update, isLoading: isUpdate } = useMutation({
		mutationFn: ({ id }) => updateBuy(id),
		onSuccess: () => {
			toast.success("order completed");
			queryClient.invalidateQueries({ queryKey: ["buy"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdate, update };
}

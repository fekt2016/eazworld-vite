import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBuy as apiUpdateBuy } from "../../services/apibuy";
import { toast } from "react-hot-toast";

export function useUpdateBuy() {
	const queryClient = useQueryClient();

	const { mutate: updateBuy } = useMutation({
		mutationFn: () => apiUpdateBuy(),
		onSuccess: () => {
			toast.success(`update order successfully`);
			queryClient.invalidateQueries({ queryKey: ["buy"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { updateBuy };
}

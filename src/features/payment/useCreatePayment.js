import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createPayment as PaymentApi } from "../../services/apiPayment";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreatePayment() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: createPayment, isLoading: isCreating } = useMutation({
		mutationFn: (newBuy) => PaymentApi(newBuy),
		onSuccess: () => {
			toast.success("payment received successfully");
			queryClient.invalidateQueries({
				queryKey: ["payment"],
			});
			navigate("/history", { replace: true });
		},

		onError: (err) => toast.error(err.message),
	});

	return { createPayment, isCreating };
}

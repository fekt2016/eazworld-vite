import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBuy as deleteBuyApi } from '../../services/apibuy';
import toast from 'react-hot-toast';

export function useDeleteBuy() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteBuy } = useMutation({
		mutationFn: deleteBuyApi,
		onSuccess: () => {
			toast.success('Order successfully deleted');
			queryClient.invalidateQueries({ queryKey: ['buy'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteBuy };
}

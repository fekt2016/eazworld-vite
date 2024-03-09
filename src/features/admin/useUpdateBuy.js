import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBuy as updateBuyApi } from '../../services/apibuy';
import { toast } from 'react-hot-toast';

// export function useUpdateBuy() {
// 	const queryClient = useQueryClient();

// 	const { mutate: updateBuy, isLoading: isUpdating } = useMutation({
// 		mutationFn: ({ id }) => updateBuyApi(id),
// 		onSuccess: (data) => {
// 			console.log(data);
// 			toast.success('order completed');
// 			queryClient.invalidateQueries({ queryKey: ['buy'] });
// 		},
// 		onError: (err) => toast.error(err.message),
// 	});

// 	return { isUpdating, updateBuy };
// }

export function useUpdateBuy() {
	const queryClient = useQueryClient();

	const { mutate, isLoading } = useMutation({
		mutationFn: (id) => updateBuyApi(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['buy'] });
			toast.success('order completed');
		},
		onError: (err) => toast.error(err.message),
	});

	return { mutate, isLoading };
}

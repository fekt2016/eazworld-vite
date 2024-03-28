import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createBuy as buyApi } from '../../services/apibuy';
import toast from 'react-hot-toast';

export function useCreateBuy() {
	const queryClient = useQueryClient();

	const { mutate: createBuy, isLoading: isCreating } = useMutation({
		mutationFn: (newBuy) => buyApi(newBuy),
		onSuccess: () => {
			toast.success('New order successfully created');
			queryClient.invalidateQueries({
				queryKey: ['buy'],
			});
		},

		onError: (err) => toast.error(err.message),
	});

	return { createBuy, isCreating };
}

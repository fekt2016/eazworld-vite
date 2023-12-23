import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateRate as apiRate } from '../../../services/apiRate';

export function useUpdateRate() {
	const queryClient = useQueryClient();

	const { mutate: updateRate, isLoading: isUpdating } = useMutation({
		mutationFn: ({ id, newRate }) => apiRate(id, newRate),
		onSuccess: () => {
			toast.success('rate successfully edited');
			queryClient.setQueryData(['rate']);
		},
		onError: (err) => toast.error(err.message),
	});

	return { updateRate, isUpdating };
}

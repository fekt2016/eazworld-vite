import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateMiners as apiMiners } from '../../../services/apiMiner';

export function useUpdateMiners() {
	const queryClient = useQueryClient();

	const { mutate: updateMiners, isLoading: isUpdating } = useMutation({
		mutationFn: ({ id, newFee }) => apiMiners(id, newFee),
		onSuccess: () => {
			toast.success('miner fees successfully updated');
			queryClient.setQueryData(['miner']);
		},
		onError: (err) => toast.error(err.message),
	});

	return { updateMiners, isUpdating };
}

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createTest as testApi } from '../../services/apiTest';
import toast from 'react-hot-toast';

export function useCreateTest() {
	const queryClient = useQueryClient();

	const { mutate: createTest, isLoading: isCreating } = useMutation({
		mutationFn: (newBuy) => testApi(newBuy),
		onSuccess: () => {
			toast.success('testimonial successfully created');
			queryClient.invalidateQueries({
				queryKey: ['test'],
			});
		},

		onError: (err) => toast.error(err.message),
	});

	return { createTest, isCreating };
}

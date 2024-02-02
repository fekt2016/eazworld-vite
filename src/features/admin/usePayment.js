import { useQuery } from '@tanstack/react-query';
import { getPayment } from '../../services/apiPayment';

export function usePayment() {
	const { isLoading, data, error, count } = useQuery({
		queryKey: ['payment'],
		queryFn: getPayment,
	});
	return { isLoading, data, error, count };
}

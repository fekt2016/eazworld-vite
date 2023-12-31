import { useQuery } from '@tanstack/react-query';
import { getSell } from '../../services/apiSell';

export function useAllSell() {
	const { isLoading, data, error, count } = useQuery({
		queryKey: ['sell'],
		queryFn: getSell,
	});

	return { isLoading, data, error, count };
}

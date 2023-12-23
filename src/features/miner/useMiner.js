import { useQuery } from '@tanstack/react-query';
import { getMiners } from '../../services/apiMiner';

export function useMiner() {
	const { isLoading, data, error } = useQuery({
		queryKey: ['miner'],
		queryFn: getMiners,
	});
	return { isLoading, data, error };
}

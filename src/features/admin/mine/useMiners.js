import { useQuery } from '@tanstack/react-query';
import { getMiners } from '../../../services/apiMiner';

export function useMiners() {
	const {
		isLoading,
		data: miner,
		error,
	} = useQuery({
		queryKey: ['miner'],
		queryFn: getMiners,
	});
	return { isLoading, miner, error };
}

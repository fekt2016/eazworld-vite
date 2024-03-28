import { useQuery } from '@tanstack/react-query';
import { getBuy } from '../../services/apibuy';
import { useSearchParams } from 'react-router-dom';

export function useAllBuy() {
	const [searchParams] = useSearchParams();

	const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
	const {
		isLoading,
		data: { data: buy, count } = {},
		error,
	} = useQuery({
		queryKey: ['buy', page],
		queryFn: () => getBuy({ page }),
	});
	return { isLoading, buy, error, count };
}

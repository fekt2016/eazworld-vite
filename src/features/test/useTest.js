import { useQuery } from '@tanstack/react-query';
import { getTest } from '../../services/apiTest';

export function useTest() {
	const { isLoading, data, error } = useQuery({
		queryKey: ['test'],
		queryFn: getTest,
	});
	return { isLoading, data, error };
}

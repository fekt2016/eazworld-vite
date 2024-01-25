import supabase from './supabase';

export async function getUsers() {
	const {
		data: users,
		error,
		count,
	} = await supabase
		.from('users')
		.select('*', { count: 'exact' })
		.order('created_at', { ascending: false });

	return { users, error, count };
}

import supabase from './supabase';

export async function getRate() {
	const { data, error } = await supabase.from('rate').select('*');
	if (error) throw new Error(error.message);

	return { data, error };
}

export async function updateRate(id, newRate) {
	const { data, error } = await supabase
		.from('rate')
		.update({ ...newRate })
		.eq('id', id)
		.select()
		.order('created_at', { ascending: false })
		.single();

	if (error) {
		console.error(error);
		throw new Error('Rate could not be updated');
	}
	return data;
}

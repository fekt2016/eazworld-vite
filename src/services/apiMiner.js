import supabase from './supabase';

export async function getMiners() {
	let { data: miner, error } = await supabase.from('miner').select('*');
	if (error) throw new Error('Miners fee is not loaded');

	return miner;
}

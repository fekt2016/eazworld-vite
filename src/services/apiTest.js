import supabase from './supabase';

export async function getTest() {
	const { data, error } = await supabase.from('test').select('*');
	if (error) {
		console.error(error);
		throw new Error('testimonial could not be loaded');
	}
	return data;
}

export async function createTest(newBuy) {
	const { data, error } = await supabase.from('test').insert([newBuy]);
	if (error) {
		throw new Error('testimonial could not be loaded');
	}

	return data;
}

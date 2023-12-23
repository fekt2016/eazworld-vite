import supabase from "./supabase";

export async function getRate() {
	const { data, error } = await supabase.from("rate").select("*");
	if (error) throw new Error(error.message);

	return { data, error };
}

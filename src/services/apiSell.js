import supabase from "./supabase";

export async function getSell() {
	const { data, error } = await supabase.from("sell").select("*");

	if (error) {
		console.error(error);
		throw new Error("currency could not be loaded");
	}
	return data;
}

export async function createSell(newSell) {
	const { data, error } = await supabase.from("sell").insert([newSell]);

	if (error) {
		console.error(error);
		throw new Error("currency could not be loaded");
	}

	return data;
}

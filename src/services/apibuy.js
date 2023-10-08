import supabase from "./supabase";

export async function getBuy() {
	const { data: buy, error } = await supabase.from("buy").select("*");

	if (error) {
		console.log(error);
		throw new Error("currency could not be loaded");
	}

	return { buy, error };
}

export async function createBuy(newBuy) {
	const { data, error } = await supabase.from("buy").insert([newBuy]);

	if (error) {
		console.error(error);
		throw new Error("currency could not be loaded");
	}

	return data;
}

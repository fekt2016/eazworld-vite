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

export async function getCurrentUserBuy() {
	const {
		data: { user },
		error2,
	} = await supabase.auth.refreshSession();

	if (error2) throw new Error(error.message);

	const { data, error } = await supabase
		.from("buy")
		.select("*")
		.eq("user_id", user.id);

	if (error) throw new Error("currency could not be loaded");

	return data;
}

export async function getCurrentBuy() {
	const { data, error } = await supabase.from("buy").select("*");

	if (error) throw new Error("currency could not be loaded");

	return { data, error };
}

export async function updateBuy() {
	const { data, error } = await supabase
		.from("buy")
		.update({ status: "payment" })
		.eq("amountGh", 90);

	if (error) throw new Error("buy could not be loaded");

	return { data, error };
}

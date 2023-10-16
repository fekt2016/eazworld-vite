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

export async function getCurrentUserSell() {
	const {
		data: { user },
		error2,
	} = await supabase.auth.refreshSession();

	if (error2) throw new Error(error.message);

	const { data, error } = await supabase
		.from("sell")
		.select("*")
		.eq("user_id", user.id);

	if (error) throw new Error("currency could not be loaded");

	return data;
}

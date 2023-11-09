import supabase from "./supabase";

// export async function getPayment() {
// 	const { data: payment, error } = await supabase.from("payment").select("*");

// 	if (error) {
// 		console.log(error);
// 		throw new Error("Payment could not be loaded");
// 	}

// 	return { payment, error };
// }

export async function createPayment(newBuy) {
	const { data, error } = await supabase.from("payment").insert([newBuy]);

	if (error) {
		console.error(error);
		throw new Error("Payment could not be loaded");
	}

	return data;
}

// export async function getCurrentUserBuy() {
// 	const {
// 		data: { user },
// 		error2,
// 	} = await supabase.auth.refreshSession();

// 	if (error2) throw new Error(error.message);

// 	const { data, error } = await supabase
// 		.from("buy")
// 		.select("*")
// 		.eq("user_id", user.id);

// 	if (error) throw new Error("currency could not be loaded");

// 	return data;
// }

// export async function getCurrentPayment() {
// 	const { data, error } = await supabase.from("payment").select("*");

// 	if (error) throw new Error("currency could not be loaded");

// 	return { data, error };
// }

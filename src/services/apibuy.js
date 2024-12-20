import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getBuy({ page }) {
  let query = supabase
    .from("buy")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error("currency could not be loaded");
  }

  return { data, count, error };
}

export async function createBuy(newBuy) {
  const { data, error } = await supabase.from("buy").insert([newBuy]);
  if (error) {
    throw new Error("currency could not be loaded");
  }

  return data;
}

export async function getCurrentUserBuy({ page }) {
  const {
    data: { user },

    error2,
  } = await supabase.auth.refreshSession();

  if (error2) throw new Error(error.message);

  let query = supabase
    .from("buy")
    .select("*", {
      count: "exact",
    })
    .order("created_at", { ascending: false })
    .eq("userId", user.id);

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }
  const { data, error, count } = await query;
  if (error) throw new Error("currency could not be loaded");
  return { data, count };
}

export async function getCurrentBuy(id) {
  const { data, error } = await supabase
    .from("buy")
    .select("*")
    .eq("orderId", id);

  if (error) throw new Error("there was an error");

  return { data, error };
}

export async function updateBuy(id, status) {
  console.log(status, id);
  const { data, error } = await supabase
    .from("buy")
    .update({ status: status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("buy could not be updated");

  return { data, error };
}

export async function deleteBuy(id) {
  const { data, error } = await supabase.from("buy").delete().eq("id", id);
  if (error) throw new Error("buy could not be updated");

  return data;
}

import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getSell() {
  const { data, error, count } = await supabase
    .from("sell")
    .select("*", { count: "exact" });

  if (error) {
    throw new Error("currency could not be loaded");
  }
  return { data, count };
}

export async function createSell(newSell) {
  const { data, error } = await supabase.from("sell").insert([newSell]);

  if (error) {
    console.error(error);
    throw new Error("currency could not be loaded");
  }

  return data;
}
export async function getCurrentSell(id) {
  const { data, error } = await supabase
    .from("sell")
    .select("*")
    .eq("orderId", id);

  if (error) throw new Error("there was an error");

  return { data, error };
}

export async function getCurrentUserSell({ page }) {
  const {
    data: { user },
    error2,
  } = await supabase.auth.refreshSession();

  if (error2) throw new Error(error.message);

  let query = supabase
    .from("sell")
    .select("*", { count: "exact" })
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

export async function updateSell(id) {
  const { data, error } = await supabase
    .from("sell")
    .update({ status: "order completed" })
    .eq("id", id)
    .select();

  if (error) throw new Error("sell could not be updated");
  return { data, error };
}

export async function deleteSell(id) {
  const { data, error } = await supabase.from("sell").delete().eq("id", id);
  if (error) throw new Error("buy could not be updated");

  return data;
}

import supabase from "./supabase";

export async function getMiners() {
  let { data: miner, error } = await supabase.from("miner").select("*");
  if (error) throw new Error("Miners fee is not loaded");
  return miner;
}

export async function updateMiners(id, newFee) {
  const { data, error } = await supabase
    .from("miner")
    .update({ ...newFee })
    .eq("id", id)
    .select()
    .order("created_at", { ascending: false })
    .single();

  if (error) {
    console.error(error);
    throw new Error("mine could not be updated");
  }
  return data;
}

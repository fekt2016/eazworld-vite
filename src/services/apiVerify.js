// import supabase from "./supabase";

// export async function verify({ data }) {
//   if (!avatar) return data;

//   const { data, error } = await supabase.from("photo_verification").select("*");

//   if (error) throw new Error(error.message);

//   return { data, error };
// }

export async function createVerify(newVerify) {
  // const fileName = `verify-${newVerify.userId}-${Math.random()}`;

  console.log(newVerify);

  // const { data, error } = await supabase
  //   .from("photo_verification")
  //   .insert([newVerify])
  //   .select();

  // return { data, error };
}

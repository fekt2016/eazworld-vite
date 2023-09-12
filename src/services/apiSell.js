import supabase from "./supabase";

export async function getSell(){

const  { data, error } = await supabase
.from('sell')
.select('*')
if(error){
  console.error(error)
  throw new Error('currency could not be loaded')
}
return data
}


// export async function deleteCabin(id){


//   const { data, error } = await supabase
//   .from('')
//   .delete()
//   .eq('id', id)

//   if(error){
//     console.error(error)
//     throw new Error('Cabin could not be loaded')
//   }

// return data
// }
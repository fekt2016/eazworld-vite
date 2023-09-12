import supabase from "./supabase";

export async function getBuy(){

    const  { data, error } = await supabase
    .from('buy')
    .select('*')
    if(error){
      console.error(error)
      throw new Error('currency could not be loaded')
    }
    return data
    }


export async function createBuy(newBuy){

const { data, error } = await supabase
.from('buycurrency')
.insert([newBuy])

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



import supabase from "./supabase"

export async function getTestimonial(){

    const  { data, error } = await supabase
    .from('testimonial')
    .select('*')
    if(error){
      console.error(error)
      throw new Error('testimonial could not be loaded')
    }
    return data
    }
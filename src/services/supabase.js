
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gblbjmnkuiorseguwbre.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdibGJqbW5rdWlvcnNlZ3V3YnJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5NDkzMDIsImV4cCI6MjAwOTUyNTMwMn0.ZrNZS6D8PgGT_XHiulrLht2U0tJUEzcsK7kenYRQ3cs'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
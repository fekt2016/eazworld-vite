import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://cwwmtmryljgiljfvzagd.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3d210bXJ5bGpnaWxqZnZ6YWdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY0NTY5NTksImV4cCI6MjAxMjAzMjk1OX0.Ke9E60JoEHIGK1M-Pajx_mdHVObAzQObjrwpfodBebM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

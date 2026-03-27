import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uweusjdsnhhmmjcthvvq.supabase.co";
const supabaseKey = "sb_publishable_qSnNauBuqU5315Czc-OfUA_x9erpv46";

export const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from "@supabase/supabase-js";
import { supabaseURL, supbaseToken } from "../config/supabase";

export const supabaseClient = createClient(supabaseURL, supbaseToken);

import { createContext } from "react";
import { supabaseClient } from "../lib/modules/supabase";
import { SupabaseAuthSingleton } from "../lib/service/supabaseAuth";
import { AuthClient } from "../types/fetchClient";

export const defaultValue: AuthClient = SupabaseAuthSingleton.getInstance(
  supabaseClient.auth
);

export const AuthContext = createContext(defaultValue);

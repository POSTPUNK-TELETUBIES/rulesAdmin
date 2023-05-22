import { createContext } from "react";
import { supabaseClient } from "../lib/modules/supabase";
import { SupabaseAuthSingleton } from "../lib/service/supabaseAuth";
import { AuthClient } from "../types/fetchClient";

export const defaultValue: AuthClient & { isLoading?: boolean } = Object.assign(
  SupabaseAuthSingleton.getInstance(supabaseClient.auth),
  { isLoading: true }
);

export const AuthContext = createContext(defaultValue);

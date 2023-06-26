import { getEnvOrThorw } from "../../tools"

export const supbaseToken = getEnvOrThorw('VITE_SUPABASE_TOKEN')

export const supabaseURL = getEnvOrThorw('VITE_SUPABASE_URL')

export const clientType = import.meta.env.VITE_TYPE_CLIENT || 'axios'

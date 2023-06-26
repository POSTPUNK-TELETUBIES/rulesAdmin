import { getEnvOrThrow } from '../../tools';

export const supbaseToken = getEnvOrThrow('VITE_SUPABASE_TOKEN');

export const supabaseURL = getEnvOrThrow('VITE_SUPABASE_URL');

export const clientType = import.meta.env.VITE_TYPE_CLIENT || 'axios';

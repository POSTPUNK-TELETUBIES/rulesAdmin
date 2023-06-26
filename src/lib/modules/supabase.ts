import { createClient } from '@supabase/supabase-js';
import { supabaseURL, supbaseToken } from '../config/supabase';

const mockServer =
  import.meta.env.DEV && import.meta.env.VITE_IS_INTERCEPTOR_ON
    ? await import('../../../mock/mirage.ts')
    : undefined;

const server = mockServer?.serverInit();

window.mockServer = server;

export const supabaseClient = createClient(supabaseURL, supbaseToken);

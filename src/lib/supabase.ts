import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Client configuration
const clientConfig = {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'X-Client-Info': 'supabase-js/2.38.0'
      }
    },
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    }
  };

  export const supabase = createClient(supabaseUrl, supabaseAnonKey, clientConfig);
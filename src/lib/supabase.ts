import { createClient } from '@supabase/supabase-js';

// Detect both prefixed (standard Vite) and unprefixed (Vercel build-time) env vars
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing! Check your Vercel/Environment settings.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

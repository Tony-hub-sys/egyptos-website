import { createClient } from "@supabase/supabase-js";

// Falls back to placeholders so the site builds and deploys even before
// Supabase is configured — forms will show their error state until the real
// env vars are added in Vercel (Settings → Environment Variables).
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

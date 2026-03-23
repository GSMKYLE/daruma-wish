import { createClient } from '@supabase/supabase-js';

// Fallback values are needed during Next.js build time when env vars might not be available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Export a single instance of the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

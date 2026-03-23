import { createClient } from '@supabase/supabase-js';

// Fallback values are needed during Next.js build time when env vars might not be available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uqicwvpwfdoiygrbglbs.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxaWN3dnB3ZmRvaXlncmJnbGJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyODAxMjgsImV4cCI6MjA4OTg1NjEyOH0.zstKOfHGOoxDpqltot8UVhzS1rSioFJRZKETHn9YhOw';

// Export a single instance of the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

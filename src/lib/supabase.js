import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to check if configuration is complete
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Table names for easy reference
export const TABLES = {
    MENU_ITEMS: 'menu_items',
    CATEGORIES: 'categories'
};

export const cafeConfig = {
    name: 'Fares Pizzeria',
    slogan: 'Daily Fresh',
    logoPath: '/logo.jpg',
    primaryColor: 'orange',
    accentColor: 'slight black',
    whatsappNumber: '+251', // Replace with actual café number
    // Supabase details are pulled from environment variables
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
};

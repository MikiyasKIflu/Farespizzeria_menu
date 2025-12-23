export const cafeConfig = {
    name: 'Fares Pizzeria',
    slogan: 'Daily Fresh',
    logoPath: '/logo.jpg', // Updated logo path
    primaryColor: 'orange',
    accentColor: 'slight black',
    whatsappNumber: '+251', // Replace with actual café number
    // Supabase details are pulled from environment variables
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_SUPABASE_KEY,
};

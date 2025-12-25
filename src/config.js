export const cafeConfig = {
    name: 'Fares Pizzeria',
    slogan: 'Daily Fresh',
    logoPath: '/logo.jpg', // Updated logo path
    primaryColor: 'orange',
    accentColor: 'slight black',
    whatsappNumber: '+251', // Replace with actual café number
    // Appwrite details are pulled from environment variables
    appwriteEndpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
    appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
};

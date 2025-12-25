import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

if (endpoint && projectId) {
    client
        .setEndpoint(endpoint)
        .setProject(projectId);
}

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const COLLECTION_ITEMS_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ITEMS_ID;
export const COLLECTION_CATEGORIES_ID = import.meta.env.VITE_APPWRITE_COLLECTION_CATEGORIES_ID;

// Helper to check if configuration is complete
export const isAppwriteConfigured = !!(endpoint && projectId && DATABASE_ID);

export { client };

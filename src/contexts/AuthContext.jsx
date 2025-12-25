import React, { createContext, useState, useEffect, useContext } from 'react';
import { account, isAppwriteConfigured } from '../lib/appwrite';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAppwriteConfigured) {
            setLoading(false);
            return;
        }

        // Check active session
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const session = await account.get();
            setUser(session);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const value = {
        signIn: async ({ email, password }) => {
            try {
                await account.createEmailPasswordSession(email, password);
                await checkUser();
                return { data: { user: await account.get() }, error: null };
            } catch (error) {
                return { data: { user: null }, error };
            }
        },
        signOut: async () => {
            try {
                await account.deleteSession('current');
                setUser(null);
                return { error: null };
            } catch (error) {
                return { error };
            }
        },
        user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

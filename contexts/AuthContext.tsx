import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../services/appwrite';
import { Models } from 'react-native-appwrite';

type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const currentUser = await account.get();
            setUser(currentUser);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await account.createSession(email, password);
            const currentUser = await account.get();
            setUser(currentUser);
        } catch (error: any) {
            throw new Error(error.message || 'Failed to login. Please check your credentials.');
        }
    };

    const signup = async (email: string, password: string, name: string) => {
        try {
            // First create the account
            await account.create('unique()', email, password, name);
            
            // Then create a session to automatically log the user in
            await account.createSession(email, password);
            
            // Get the current user
            const currentUser = await account.get();
            setUser(currentUser);
        } catch (error: any) {
            console.error('Signup error:', error);
            throw new Error(error.message || 'Failed to create account. Please try again.');
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
        } catch (error: any) {
            throw new Error(error.message || 'Failed to logout. Please try again.');
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 
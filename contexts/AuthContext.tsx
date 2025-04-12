import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../services/appwrite';
import { Models } from 'react-native-appwrite';
import { showToast } from '../config/toast';

type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    session: Models.Session | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [session, setSession] = useState<Models.Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const currentUser = await account.get();
            setUser(currentUser);
        } catch (error) {
            console.log('No user session:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            console.log('Attempting to login with:', email);
            const responseUser = await account.createEmailPasswordSession(email, password);
            setSession(responseUser);
            const currentUser = await account.get();
            console.log('Login successful, user:', currentUser);
            setUser(currentUser);
            showToast.success('Login successful!');
        } catch (error: any) {
            console.error('Login error:', error);
            if (error.message.includes('Invalid credentials')) {
                throw new Error('Invalid email or password');
            } else if (error.message.includes('User not found')) {
                throw new Error('No account found with this email');
            } else {
                throw new Error(error.message || 'Failed to login. Please try again.');
            }
        }
    };

    const signup = async (email: string, password: string, name: string) => {
        try {
            console.log('Attempting to signup with:', email);
            await account.create('unique()', email, password, name);
            await account.createSession(email, password);
            const currentUser = await account.get();
            console.log('Signup successful, user:', currentUser);
            setUser(currentUser);
            showToast.success('Account created successfully!');
        } catch (error: any) {
            console.error('Signup error:', error);
            if (error.message.includes('already exists')) {
                throw new Error('An account with this email already exists');
            } else {
                throw new Error(error.message || 'Failed to create account. Please try again.');
            }
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
            showToast.success('Logged out successfully!');
        } catch (error: any) {
            console.error('Logout error:', error);
            throw new Error(error.message || 'Failed to logout. Please try again.');
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, session }}>
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
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar"; // Import StatusBar from Expo
import { View } from "react-native";
import './globals.css';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { router } from 'expo-router';

function RootLayoutNav() {
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            if (user) {
                router.replace('/(tabs)');
            } else {
                router.replace('/(auth)/login');
            }
        }
    }, [user, loading]);

    if (loading) {
        return null;
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar hidden={true} translucent={true} style="light" />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
            </Stack>
        </View>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootLayoutNav />
        </AuthProvider>
    );
}



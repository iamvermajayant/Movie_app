import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar"; // Import StatusBar from Expo
import { View, Text } from "react-native";
import './globals.css';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

function RootLayoutNav() {
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            // Only redirect to login if trying to access protected features
            if (user) {
                router.replace('/(tabs)');
            } else {
                // Show home screen by default
                router.replace('/(tabs)');
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
            <Toast 
                config={{
                    success: (props) => (
                        <View style={{
                            backgroundColor: '#4CAF50',
                            padding: 15,
                            borderRadius: 10,
                            marginHorizontal: 20,
                            marginTop: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 10 }}>✓</Text>
                            <View>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>{props.text1}</Text>
                                <Text style={{ color: 'white' }}>{props.text2}</Text>
                            </View>
                        </View>
                    ),
                    error: (props) => (
                        <View style={{
                            backgroundColor: '#F44336',
                            padding: 15,
                            borderRadius: 10,
                            marginHorizontal: 20,
                            marginTop: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 10 }}>✕</Text>
                            <View>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>{props.text1}</Text>
                                <Text style={{ color: 'white' }}>{props.text2}</Text>
                            </View>
                        </View>
                    ),
                }}
            />
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



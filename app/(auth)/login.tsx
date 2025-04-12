import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { showToast } from '../../config/toast';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            showToast.error('Please enter both email and password');
            return;
        }

        setLoading(true);
        try {
            await login(email, password);
            router.replace('/(tabs)');
        } catch (error: any) {
            showToast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 justify-center p-4 bg-gray-100">
            <View className="bg-white p-6 rounded-lg shadow-sm">
                <Text className="text-2xl font-bold mb-6 text-center">Login</Text>
                
                <TextInput
                    className="border border-gray-300 rounded-lg p-3 mb-4"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                
                <TextInput
                    className="border border-gray-300 rounded-lg p-3 mb-6"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                
                <TouchableOpacity
                    className={`bg-blue-500 p-3 rounded-lg mb-4 ${loading ? 'opacity-50' : ''}`}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    <Text className="text-white text-center font-semibold">
                        {loading ? 'Logging in...' : 'Login'}
                    </Text>
                </TouchableOpacity>
                
                <View className="flex-row justify-center">
                    <Text className="text-gray-600">Don't have an account? </Text>
                    <Link href="/(auth)/signup" asChild>
                        <TouchableOpacity>
                            <Text className="text-blue-500 font-semibold">Sign Up</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    );
} 
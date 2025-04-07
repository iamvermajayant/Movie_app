import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();

    const handleSignup = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (password.length < 8) {
            Alert.alert('Error', 'Password must be at least 8 characters long');
            return;
        }

        setLoading(true);
        try {
            await signup(email, password, name);
            router.replace('/(tabs)');
        } catch (error: any) {
            console.error('Signup error:', error);
            Alert.alert(
                'Error',
                error.message || 'Failed to create account. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 justify-center p-4 bg-gray-100">
            <View className="bg-white p-6 rounded-lg shadow-sm">
                <Text className="text-2xl font-bold mb-6 text-center">Sign Up</Text>
                
                <TextInput
                    className="border border-gray-300 rounded-lg p-3 mb-4"
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />
                
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
                    onPress={handleSignup}
                    disabled={loading}
                >
                    <Text className="text-white text-center font-semibold">
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </Text>
                </TouchableOpacity>
                
                <View className="flex-row justify-center">
                    <Text className="text-gray-600">Already have an account? </Text>
                    <Link href="/(auth)/login" asChild>
                        <TouchableOpacity>
                            <Text className="text-blue-500 font-semibold">Login</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    );
} 
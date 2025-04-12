import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

const Profile = () => {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0F172A]">
      <View className="flex-1 px-4 py-6">
        <View className="items-center mb-8">
          <View className="w-24 h-24 rounded-full bg-gray-700 items-center justify-center mb-4">
            <Ionicons name="person" size={50} color="#94A3B8" />
          </View>
          <Text className="text-white text-2xl font-bold mb-2">{user?.name}</Text>
          <Text className="text-gray-400">{user?.email}</Text>
        </View>

        <View className="bg-gray-800 rounded-lg p-4 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-gray-400">Account Created</Text>
            <Text className="text-white">
              {new Date(user?.$createdAt || '').toLocaleDateString()}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-400">User ID</Text>
            <Text className="text-white text-xs">{user?.$id}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-600 rounded-lg p-4 flex-row items-center justify-center"
        >
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Profile
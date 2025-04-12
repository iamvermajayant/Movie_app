import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useSavedMovies } from '../../contexts/SavedMoviesContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const Saved = () => {
  const { savedMovies, loading, removeMovieFromCollection } = useSavedMovies()
  const router = useRouter()

  console.log('Saved Movies Data:', {
    totalMovies: savedMovies.length,
    movies: savedMovies,
    loadingState: loading
  });

  const renderMovieItem = ({ item }: { item: any }) => {
    console.log('Rendering movie item:', item);
    return (
      <TouchableOpacity
        onPress={() => router.push(`/movie/${item.movieId}`)}
        className="bg-gray-800 rounded-lg p-4 mb-4 flex-row"
      >
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.posterPath}` }}
          className="w-20 h-28 rounded-lg"
          resizeMode="cover"
        />
        <View className="flex-1 ml-4">
          <Text className="text-white text-lg font-semibold mb-1">{item.title}</Text>
          <Text className="text-gray-400 text-sm mb-2">{item.releaseDate?.split('-')[0]}</Text>
          <View className="flex-row items-center">
            <Ionicons name="star" size={16} color="#FBBF24" />
            <Text className="text-yellow-400 ml-1">{item.voteAverage?.toFixed(1)}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => removeMovieFromCollection(item.$id)}
          className="p-2"
        >
          <Ionicons name="trash-outline" size={24} color="#EF4444" />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  if (loading) {
    console.log('Loading state active');
    return (
      <SafeAreaView className="flex-1 bg-[#0F172A] items-center justify-center">
        <Text className="text-white">Loading...</Text>
      </SafeAreaView>
    )
  }

  console.log('Rendering saved movies list');
  return (
    <SafeAreaView className="flex-1 bg-[#0F172A]">
      <View className="flex-1 px-4 py-6">
        <Text className="text-white text-2xl font-bold mb-6">Saved Movies</Text>
        
        {savedMovies.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Ionicons name="bookmark-outline" size={64} color="#94A3B8" />
            <Text className="text-gray-400 text-lg mt-4">No saved movies yet</Text>
          </View>
        ) : (
          <FlatList
            data={savedMovies}
            renderItem={renderMovieItem}
            keyExtractor={(item) => item.$id}
            showsVerticalScrollIndicator={false}
            onEndReached={() => console.log('End of list reached')}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default Saved
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ActivityIndicator, FlatList, FlatListComponent, Image, ScrollView, Text, View } from "react-native";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  const router = useRouter();

  const {data:movies, loading:moviesLoading, error:moviesError} = useFetch(() => fetchMovies({ query: '' }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      

      {moviesLoading ? (
        <ActivityIndicator
          size="large"
          color="#ab8bff"
          className="mt-10 self-center"
        />
      ) : (moviesError ? (
        <Text className="text-white text-center mt-10">
          {moviesError?.message}
        </Text>
      ) : (
          <>
          <SearchBar 
            onPress={() => router.push('/search')}
            placeholder="Search for movies"
          />

          <Text className="text-lg text-white font-bold mt-5 mb-3">
            Latest Movies
          </Text>

          <FlatList
            data={movies}
            renderItem={({ item }) => (
              <MovieCard
                {...item}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{ 
              justifyContent: 'flex-start', 
              gap: 10,
              paddingRight: 5,
              marginBottom: 10
             }}
            className="mt-2 pb-32"
            scrollEnabled={false}
          />
        </>
      ))}
      </ScrollView>
    </View>
  );
}


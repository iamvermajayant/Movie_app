import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
 

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: refetchMovies,
    reset: resetMovies,
  } = useFetch(() => fetchMovies({ query: searchTerm }), false);

  useEffect(()=>{
    const timeoutId =  setTimeout(async() => {
    if(searchTerm.trim()) {
      await refetchMovies()
    }
    else{
      resetMovies();
    }
  }, 500)

  return () => clearTimeout(timeoutId);
  },[searchTerm])

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({item}) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        className="px-5 ml-5"
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          paddingRight: 5,
          marginBottom: 10,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row items-center justify-center mt-20">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar 
                placeholder="Search for movies" 
                value={searchTerm}
                onChangeText={(text:string) => setSearchTerm(text)}
              />
            </View>
            {moviesLoading && (
              <ActivityIndicator
                size="large"
                color="#ab8bff"
                className="mt-10 self-center"
              />
            )}

            {moviesError && (
              <Text className="text-red-500 text-center mt-10">
                {moviesError?.message}
              </Text>
            )}

            {!moviesLoading &&
              !moviesError &&
              searchTerm.trim() &&
              movies?.length > 0 && (
                <Text className="text-xl text-white mt-2">
                  Search results for{" "}
                  <Text className="text-accent font-bold">{searchTerm}</Text>
                </Text>
              )}
          </>
        }
      />
    </View>
  );
};

export default Search;

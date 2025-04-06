import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { updateSearchCount } from "@/services/appwrite";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: refetchMovies,
    reset: resetMovies,
  } = useFetch(() => fetchMovies({ query: searchTerm }), false);

  console.log("movies", movies);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm.trim()) {
        await refetchMovies();
      } else {
        resetMovies();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    if (movies?.length > 0 && movies?.[0]) {
      updateSearchCount(searchTerm, movies[0]);
    }
  }, [movies]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
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
                onChangeText={(text: string) => setSearchTerm(text)}
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
        ListEmptyComponent={
          !moviesLoading && !moviesError && searchTerm.trim() ? (
            <Text className="text-gray-500 text-center text-muted-foreground mt-10">
              No results found
            </Text>
          ) : null
        }
      />
    </View>
  );
};

export default Search;


// import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
// import React, { useEffect, useState } from "react";
// import { images } from "@/constants/images";
// import { fetchMovies } from "@/services/api";
// import useFetch from "@/services/useFetch";
// import MovieCard from "@/components/MovieCard";
// import { icons } from "@/constants/icons";
// import SearchBar from "@/components/SearchBar";
// import useDebounce from "@/hooks/useDebounce";// Import the debounce hook

// const Search = () => {
//   const [searchTerm, setSearchTerm] = useState("");

//   // Apply debounce to searchTerm, only refetch when the debounced searchTerm changes
//   const debouncedSearchTerm = useDebounce(searchTerm, 100); // 1 second debounce

//   const {
//     data: movies,
//     loading: moviesLoading,
//     error: moviesError,
//     refetch: refetchMovies,
//     reset: resetMovies,
//   } = useFetch(() => fetchMovies({ query: debouncedSearchTerm }), false);

//   console.log("movies", movies);



//   useEffect(() => {
//     if (debouncedSearchTerm.trim()) {
//       refetchMovies(); // Refetch movies when the debounced search term changes
//     } else {
//       resetMovies(); // Reset movies if searchTerm is empty
//     }
//   }, [debouncedSearchTerm]); // Trigger when debouncedSearchTerm changes

//   return (
//     <View className="flex-1 bg-primary">
//       <Image
//         source={images.bg}
//         className="absolute w-full z-0"
//         resizeMode="cover"
//       />
//       <FlatList
//         data={movies}
//         renderItem={({ item }) => <MovieCard {...item} />}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={3}
//         className="px-5 ml-5"
//         columnWrapperStyle={{
//           justifyContent: "flex-start",
//           gap: 16,
//           paddingRight: 5,
//           marginBottom: 10,
//           marginVertical: 16,
//         }}
//         contentContainerStyle={{
//           paddingBottom: 100,
//         }}
//         ListHeaderComponent={
//           <>
//             <View className="w-full flex-row items-center justify-center mt-20">
//               <Image source={icons.logo} className="w-12 h-10" />
//             </View>
//             <View className="my-5">
//               <SearchBar
//                 placeholder="Search for movies"
//                 value={searchTerm}
//                 onChangeText={(text: string) => setSearchTerm(text)}
//               />
//             </View>
//             {moviesLoading && (
//               <ActivityIndicator
//                 size="large"
//                 color="#ab8bff"
//                 className="mt-10 self-center"
//               />
//             )}

//             {moviesError && (
//               <Text className="text-red-500 text-center mt-10">
//                 {moviesError?.message}
//               </Text>
//             )}

//             {!moviesLoading &&
//               !moviesError &&
//               debouncedSearchTerm.trim() &&
//               movies?.length > 0 && (
//                 <Text className="text-xl text-white mt-2">
//                   Search results for{" "}
//                   <Text className="text-accent font-bold">{debouncedSearchTerm}</Text>
//                 </Text>
//               )}
//           </>
//         }
//         ListEmptyComponent={
//           !moviesLoading && !moviesError && debouncedSearchTerm.trim() ? (
//             <Text className="text-gray-500 text-center text-muted-foreground mt-10">
//               No results found
//             </Text>
//           ) : null
//         }
//       />
//     </View>
//   );
// };

// export default Search;


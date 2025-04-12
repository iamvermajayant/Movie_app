import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { icons } from "@/constants/icons";
import { useAuth } from "@/contexts/AuthContext";
import { showToast } from '@/config/toast';

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className="mt-4">
      <Text className="text-light-200 text-sm font-semibold">{label}</Text>
      <Text className="text-white text-sm mt-1">{value || "N/A"}</Text>
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  const handleSave = () => {
    if (!user) {
      showToast.error("Please sign in to save movies to your collection");
      router.push('/(auth)/login');
      return;
    }
    // TODO: Implement save movie functionality
    showToast.success("Movie saved to your collection!");
  };

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
            }}
            className="w-full h-[650px]"
            resizeMode="stretch"
          />
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <View className="flex-row justify-between items-center w-full">
            <Text className="text-white text-xl font-bold">{movie?.title}</Text>
            <TouchableOpacity onPress={handleSave}>
              <Image source={icons.save} className="size-6" tintColor="#fff" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm ">
              {movie?.release_date.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>

          <View className="flex-row items-center gap-x-1 mt-2 bg-dark-200 px-2 py-1 rounded-md">
            <Image source={icons.star} className="size-5" />
            <Text className="text-light-200 text-sm font-semibold">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              {movie?.vote_count} votes
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres.map((g) => g.name).join(" - ") || "N/A"}
          />
          <MovieInfo
            label="Budget"
            value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
          />
          <MovieInfo
            label="Revenue"
            value={`$${(movie?.revenue ?? 0) / 1_000_000} million`}
          />
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies.map((p) => p.name).join(", ") || "N/A"
            }
          />
          <MovieInfo
            label="Production Countries"
            value={
              movie?.production_countries.map((c) => c.name).join(", ") || "N/A"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent px-4 rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180" tintColor="#fff"/>
        <Text className="text-white font-semibold text-base">
          Go Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;

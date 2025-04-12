import { databases, ID } from './appwrite';
import { Query } from 'react-native-appwrite';
import { Models } from 'react-native-appwrite';

// Log all environment variables for debugging
console.log('Environment Variables:', {
  DATABASE_ID: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  SAVED_MOVIES_COLLECTION_ID: process.env.EXPO_PUBLIC_SAVED_MOVIES_COLLECTION_ID,
  ALL_ENV: process.env
});

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const SAVED_MOVIES = process.env.EXPO_PUBLIC_APPWRITE_SAVED_MOVIES_COLLECTION_ID || '67f93260002f692923be'!;

export const saveMovie = async (userId: string, movieId: string, movieData: any) => {
  try {
    console.log('Received data in saveMovie:', {
      userId,
      movieId,
      movieData,
    });

    console.log('Using database:', DATABASE_ID, 'and collection:', SAVED_MOVIES);

    const documentData = {
      userId,
      movieId,
      title: movieData.title,
      posterPath: movieData.posterPath,
      voteAverage: movieData.voteAverage,
      releaseDate: movieData.releaseDate,
    };

    console.log('Final document data being sent to Appwrite:', documentData);

    const savedMovie = await databases.createDocument(
      DATABASE_ID,
      SAVED_MOVIES,
      ID.unique(),
      documentData
    );
    console.log('Movie saved successfully:', savedMovie);
    return savedMovie;
  } catch (error) {
    console.error('Error saving movie:', error);
    throw error;
  }
};

export const getSavedMovies = async (userId: string) => {
  try {
    console.log('Fetching saved movies for user:', userId);
    console.log('Using database:', DATABASE_ID, 'and collection:', SAVED_MOVIES);

    const savedMovies = await databases.listDocuments(
      DATABASE_ID,
      SAVED_MOVIES,
      [Query.equal('userId', userId)]
    );
    console.log('Retrieved saved movies:', savedMovies.documents);
    return savedMovies.documents;
  } catch (error) {
    console.error('Error fetching saved movies:', error);
    throw error;
  }
};

export const removeSavedMovie = async (documentId: string) => {
  try {
    console.log('Removing saved movie with ID:', documentId);
    console.log('Using database:', DATABASE_ID, 'and collection:', SAVED_MOVIES);

    await databases.deleteDocument(DATABASE_ID, SAVED_MOVIES, documentId);
    console.log('Movie removed successfully');
  } catch (error) {
    console.error('Error removing saved movie:', error);
    throw error;
  }
}; 
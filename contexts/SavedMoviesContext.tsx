import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getSavedMovies, saveMovie, removeSavedMovie } from '../services/savedMovies';
import { showToast } from '../config/toast';

type SavedMoviesContextType = {
  savedMovies: any[];
  loading: boolean;
  saveMovieToCollection: (movieId: string, movieData: any) => Promise<void>;
  removeMovieFromCollection: (documentId: string) => Promise<void>;
  refreshSavedMovies: () => Promise<void>;
};

const SavedMoviesContext = createContext<SavedMoviesContextType | undefined>(undefined);

export const SavedMoviesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedMovies, setSavedMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchSavedMovies = async () => {
    if (!user) {
      console.log('No user found, clearing saved movies');
      setSavedMovies([]);
      setLoading(false);
      return;
    }
    try {
      console.log('Fetching saved movies for user:', user.$id);
      const movies = await getSavedMovies(user.$id);
      console.log('Fetched movies:', movies);
      setSavedMovies(movies);
    } catch (error) {
      console.error('Error fetching saved movies:', error);
      showToast.error('Failed to fetch saved movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('User changed, fetching saved movies');
    fetchSavedMovies();
  }, [user]);

  const saveMovieToCollection = async (movieId: string, movieData: any) => {
    if (!user) {
      console.log('No user found, cannot save movie');
      showToast.error('You must be logged in to save movies');
      return;
    }
    try {
      console.log('Saving movie:', { movieId, movieData });
      await saveMovie(user.$id, movieId, movieData);
      await fetchSavedMovies();
      showToast.success('Movie saved successfully!');
    } catch (error: any) {
      console.error('Error saving movie:', error);
      showToast.error(error.message || 'Failed to save movie');
    }
  };

  const removeMovieFromCollection = async (documentId: string) => {
    try {
      console.log('Removing movie with ID:', documentId);
      await removeSavedMovie(documentId);
      await fetchSavedMovies();
      showToast.success('Movie removed from saved list');
    } catch (error: any) {
      console.error('Error removing movie:', error);
      showToast.error(error.message || 'Failed to remove movie');
    }
  };

  return (
    <SavedMoviesContext.Provider
      value={{
        savedMovies,
        loading,
        saveMovieToCollection,
        removeMovieFromCollection,
        refreshSavedMovies: fetchSavedMovies,
      }}
    >
      {children}
    </SavedMoviesContext.Provider>
  );
};

export const useSavedMovies = () => {
  const context = useContext(SavedMoviesContext);
  if (context === undefined) {
    throw new Error('useSavedMovies must be used within a SavedMoviesProvider');
  }
  return context;
}; 
import { useState, useEffect } from 'react';
import { TimeWindow, Movie, MovieDetailed } from '@tv-app-packages/shared-types';
import * as MovieServices from '@services/apis/tv-app/movie.api.services';

const useFetchTrendingMovies = (timeWindow: TimeWindow = 'day', language?: string): { movies: Movie[]; isLoading: boolean; hasMovies: boolean } => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const { results } = await MovieServices.getTrendingMovies(timeWindow, language);
                setMovies(results);
            } catch (error) {
                throw new Error(`Error fetching trending movies, [Error]: ${error}`);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return {
        movies,
        isLoading,
        hasMovies: movies.length > 0,
    };
};

const useSearchMovies = (criteria: string): { movies: Movie[]; isLoading: boolean; hasMovies: boolean } => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const hasQueryCriteria = typeof criteria === 'string' && criteria.length > 0;

        if (hasQueryCriteria) {
            (async () => {
                try {
                    setIsLoading(true);
                    const { results } = await MovieServices.searchMovie(criteria);
                    setMovies(results);
                } catch (error) {
                    throw new Error(`Error fetching trending movies, [Error]: ${error}`);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [criteria]);

    return {
        movies,
        isLoading,
        hasMovies: movies.length > 0,
    };
};

const useSearchMovieById = (id: number | string): { movie: MovieDetailed | null; isLoading: boolean } => {
    const [movie, setMovie] = useState<MovieDetailed | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    setIsLoading(true);
                    const result = await MovieServices.searchMovieById(id);
                    setMovie(result);
                } catch (error) {
                    throw new Error(`Error fetching movie, [Error]: ${error}`);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [id]);

    return {
        movie,
        isLoading,
    };
};

export { useFetchTrendingMovies, useSearchMovies, useSearchMovieById };

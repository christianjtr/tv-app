import { useState, useEffect } from 'react';
import { TimeWindow, Movie } from '@tv-app-packages/shared-types';
import * as MovieServices from '@services/apis/tv-app/movie.api.services';

const useFetchTrendingMovies = (
    timeWindow: TimeWindow = 'day',
    language?: string
): { movies: Movie[]; isLoading: boolean; hasMovies: boolean; hasError: boolean } => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                setHasError(false);
                const { results } = await MovieServices.getTrendingMovies(timeWindow, language);
                setMovies(results);
            } catch {
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [language, timeWindow]);

    return {
        movies,
        isLoading,
        hasMovies: movies.length > 0,
        hasError,
    };
};

const useSearchMovies = (criteria: string): { movies: Movie[]; isLoading: boolean; hasMovies: boolean; hasError: boolean } => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let isCurrentRequest = true;
        const hasQueryCriteria = typeof criteria === 'string' && criteria.trim().length > 0;

        if (hasQueryCriteria) {
            setMovies([]);
            setHasError(false);
            setIsLoading(true);
            (async () => {
                try {
                    const { results } = await MovieServices.searchMovie(criteria);
                    if (isCurrentRequest) setMovies(results);
                } catch {
                    if (isCurrentRequest) setHasError(true);
                } finally {
                    if (isCurrentRequest) setIsLoading(false);
                }
            })();
        } else {
            setMovies([]);
            setHasError(false);
            setIsLoading(false);
        }

        return () => {
            isCurrentRequest = false;
        };
    }, [criteria]);

    return {
        movies,
        isLoading,
        hasMovies: movies.length > 0,
        hasError,
    };
};

export { useFetchTrendingMovies, useSearchMovies };

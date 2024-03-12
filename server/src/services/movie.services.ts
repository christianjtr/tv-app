import { Movie, MovieDetailed } from '@tv-app-packages/shared-types';
import { tmdbAPI } from '@apis';
import { movieMapper, movieDetailedMapper } from '@entityMappers/tmdb/movie.entity.mapper';
import { default as CacheServices } from './cache.services';

export interface MovieServiceInterface {
    search: (criteria: string) => Promise<{ page: number; results: Movie[] }>;
    searchById: (id: number | string) => Promise<MovieDetailed>;
    getTrendingMovies: (timeWindow: TMDB.TimeWindow, language?: string) => Promise<{ page: number; results: Movie[] }>;
}

const { services: tmdbAPIServices } = tmdbAPI;

export default {
    search: async (criteria: string): Promise<{ page: number; results: Movie[] }> => {
        const key = CacheServices.generateKey(['search', `criteria:${criteria}`]);
        const data = CacheServices.retrieveDatFromCache(key);

        if (data) return data as Promise<{ page: number; results: Movie[] }>;

        try {
            const { page, results } = await tmdbAPIServices.MovieServices.search(criteria);
            const movies = results.map((movie) => movieMapper(movie));

            CacheServices.performCacheStorage(key, { page, results: movies });

            return {
                page,
                results: movies,
            };
        } catch (error) {
            console.error('[TV APP][MOVIE][ERROR] ::: search', error);
            throw error;
        }
    },
    searchById: async (id: number | string): Promise<MovieDetailed> => {
        const key = CacheServices.generateKey(['searchById', `id:${String(id)}`]);
        const data = CacheServices.retrieveDatFromCache(key);

        if (data) return data as Promise<MovieDetailed>;

        try {
            const result = await tmdbAPIServices.MovieServices.searchById(id);
            const movie = movieDetailedMapper(result);

            CacheServices.performCacheStorage(key, movie);

            return movie;
        } catch (error) {
            console.error('[TV APP][MOVIE][ERROR] ::: searchById', error);
            throw error;
        }
    },
    getTrendingMovies: async (timeWindow: TMDB.TimeWindow, language?: string): Promise<{ page: number; results: Movie[] }> => {
        const key = CacheServices.generateKey(['getTrendingMovies', `timeWindow:${timeWindow}`, `language:${language}` || 'language:default']);
        const data = CacheServices.retrieveDatFromCache(key);

        if (data) return data as Promise<{ page: number; results: Movie[] }>;

        try {
            const { page, results } = await tmdbAPIServices.TrendingServices.getTrendingMovies(timeWindow, language);
            const movies = results.map((movie) => movieMapper(movie));

            CacheServices.performCacheStorage(key, { page, results: movies });

            return {
                page,
                results: movies,
            };
        } catch (error) {
            console.error('[TV APP][MOVIE][ERROR] ::: getTrendingMovies', error);
            throw error;
        }
    },
} as MovieServiceInterface;

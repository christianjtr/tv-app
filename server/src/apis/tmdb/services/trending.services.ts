import qs from 'qs';
import { default as HTTPClient } from '../httpClient';
import { Movie } from '../types/Movie';
import { TVShow } from '../types/TVShow';
import { TimeWindow } from '../types/TimeWindow';

export interface TrendingServiceInterface {
    getTrendingMovies: (timeWindow: TimeWindow, language?: string) => Promise<{ page: number; results: Movie[] }>;
    getTrendingTVShows: (timeWindow: TimeWindow, language?: string) => Promise<{ page: number; results: TVShow[] }>;
}

export default {
    getTrendingMovies: async (timeWindow: TimeWindow, language?: string): Promise<{ page: number; results: Movie[] }> => {
        try {
            const queryString = language ? `?${qs.stringify({ language })}` : '';

            const trendingMovies = await HTTPClient.get<{ page: number; results: Movie[] }>(`/trending/movie/${timeWindow}${queryString}`);
            return trendingMovies;
        } catch (error) {
            console.error('[TMDB API][ERROR] ::: getTrendingMovies', error);
            throw error;
        }
    },
    getTrendingTVShows: async (timeWindow: TimeWindow, language?: string): Promise<{ page: number; results: TVShow[] }> => {
        try {
            const queryString = language ? `?${qs.stringify({ language })}` : '';

            const trendingTVShows = await HTTPClient.get<{ page: number; results: TVShow[] }>(`/trending/tv/${timeWindow}${queryString}`);
            return trendingTVShows;
        } catch (error) {
            console.error('[TMDB API][ERROR] ::: getTrendingTVShows', error);
            throw error;
        }
    },
} as TrendingServiceInterface;

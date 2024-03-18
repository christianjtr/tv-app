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

            const response = await HTTPClient.get(`/trending/movie/${timeWindow}${queryString}`);
            const trendingMovies = await response.json();
            return trendingMovies;
        } catch (error) {
            console.error('[TMDB API][ERROR] ::: getTrendingMovies', error);
            throw error;
        }
    },
    getTrendingTVShows: async (timeWindow: TimeWindow, language?: string): Promise<{ page: number; results: TVShow[] }> => {
        try {
            const queryString = language ? `?${qs.stringify({ language })}` : '';

            const response = await HTTPClient.get(`/trending/tv/${timeWindow}${queryString}`);
            const trendingTVShows = await response.json();
            return trendingTVShows;
        } catch (error) {
            console.error('[TMDB API][ERROR] ::: getTrendingTVShows', error);
            throw error;
        }
    },
} as TrendingServiceInterface;

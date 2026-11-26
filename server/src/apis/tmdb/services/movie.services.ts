import qs from 'qs';
import { default as HTTPClient } from '../httpClient';
import { Movie } from '../types/Movie';
import { MovieDetailed } from '../types/MovieDetailed';

export interface MovieServiceInterface {
    search: (criteria: string) => Promise<{ page: number; results: Movie[] }>;
    searchById: (id: number | string) => Promise<MovieDetailed>;
}

export default {
    search: async (criteria: string): Promise<{ page: number; results: Movie[] }> => {
        try {
            const queryString = qs.stringify({ query: criteria }, { format: 'RFC1738' });
            const results = await HTTPClient.get<{ page: number; results: Movie[] }>(`/search/movie?${queryString}`);
            return results;
        } catch (error) {
            console.error('[TMDB API][MOVIES][ERROR] ::: search', error);
            throw error;
        }
    },
    searchById: async (id: number | string): Promise<MovieDetailed> => {
        try {
            const result = await HTTPClient.get<MovieDetailed>(`/movie/${id}`);
            return result;
        } catch (error) {
            console.error('[TMDB API][MOVIES][ERROR] ::: searchById', error);
            throw error;
        }
    },
} as MovieServiceInterface;

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
            const response = await HTTPClient.get(`/search/movie?${queryString}`);
            const results = await response.json();
            return results;
        } catch (error) {
            console.error('[TMDB API][MOVIES][ERROR] ::: search', error);
            throw error;
        }
    },
    searchById: async (id: number | string): Promise<MovieDetailed> => {
        try {
            const response = await HTTPClient.get(`/movie/${id}`);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('[TMDB API][MOVIES][ERROR] ::: searchById', error);
            throw error;
        }
    },
} as MovieServiceInterface;

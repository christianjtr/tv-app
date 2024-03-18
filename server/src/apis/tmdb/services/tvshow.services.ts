import qs from 'qs';
import { default as HTTPClient } from '../httpClient';
import { TVShow } from '../types/TVShow';
import { TVShowDetailed } from '../types/TVShowDetailed';

export interface TVShowServiceInterface {
    search: (criteria: string) => Promise<{ page: number; results: TVShow[] }>;
    searchById: (id: number | string) => Promise<TVShowDetailed>;
}

export default {
    search: async (criteria: string): Promise<{ page: number; results: TVShow[] }> => {
        try {
            const queryString = qs.stringify({ query: criteria }, { format: 'RFC1738' });
            const response = await HTTPClient.get(`/search/tv?${queryString}`);
            const results = await response.json();
            return results;
        } catch (error) {
            console.error('[TMDB API][TV SHOW][ERROR] ::: search', error);
            throw error;
        }
    },
    searchById: async (id: number | string): Promise<TVShowDetailed> => {
        try {
            const response = await HTTPClient.get(`/tv/${id}`);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('[TMDB API][TV SHOW][ERROR] ::: searchById', error);
            throw error;
        }
    },
} as TVShowServiceInterface;

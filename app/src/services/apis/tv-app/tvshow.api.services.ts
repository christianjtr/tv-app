import { stringify } from 'qs';
import { tvAppApi } from './tv-app.config';
import { TVShow, TVShowDetailed, TimeWindow } from '@tv-app-packages/shared-types';

const {
    config: { baseURL },
} = tvAppApi;

// Mocking purposes...
import TV_SHOW from '../../../../__fixtures__/tvshow.json';
import TV_SHOWS from '../../../../__fixtures__/tvshows.json';

export namespace TVShowResponse {
    export type TVShows = {
        page: number;
        results: TVShow[];
    };

    export type TVShowTrends = {
        page: number;
        results: TVShow[];
    };
}

export const searchTVShow = async (criteria: string): Promise<TVShowResponse.TVShows> => {
    try {
        // const queryString = `?${stringify({ query: criteria }, { format: 'RFC1738' })}`;
        // const response = await fetch(`${baseURL}/tv-shows/search${queryString}`);
        // const { page, results } = await response.json();
        // return {
        //     page,
        //     results,
        // };
        return TV_SHOWS as unknown as TVShowResponse.TVShows;
    } catch (error) {
        throw new Error(error as string | undefined);
    }
};

export const searchTVShowById = async (id: number | string): Promise<TVShowDetailed> => {
    try {
        // const response = await fetch(`${baseURL}/tv-shows/${id}`);
        // const tvshow = await response.json();
        // return tvshow;
        return TV_SHOW as unknown as TVShowDetailed;
    } catch (error) {
        throw new Error(error as string | undefined);
    }
};

export const getTrendingTVShows = async (timeWindow: TimeWindow, language?: string): Promise<TVShowResponse.TVShowTrends> => {
    try {
        // const queryString = `?${stringify({ timeWindow, language })}`;
        // const response = await fetch(`${baseURL}/tv-shows/trending${queryString}`);
        // const { page, results } = await response.json();
        // return {
        //     page,
        //     results,
        // };
        return TV_SHOWS as unknown as TVShowResponse.TVShowTrends;
    } catch (error) {
        throw new Error(error as string | undefined);
    }
};

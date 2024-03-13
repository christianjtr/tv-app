import { stringify } from 'qs';
import { tvAppApi } from './tv-app.config';
import { TVShow, TVShowDetailed, TimeWindow } from '@tv-app-packages/shared-types';

const {
    config: { baseURL, isAPIMocked },
} = tvAppApi;

// Just for mocking purposes...
// Just for mocking purposes...
const apiMock = (async () => {
    const { default: mocks } = await import('../../../../__mocks__/tv.api.service.mock');
    return mocks;
})();

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
        if (isAPIMocked) return (await apiMock).tvshowsMock as unknown as Promise<TVShowResponse.TVShows>;

        const queryString = `?${stringify({ query: criteria }, { format: 'RFC1738' })}`;
        const response = await fetch(`${baseURL}/tv-shows/search${queryString}`);
        const { page, results } = await response.json();
        return {
            page,
            results,
        };
    } catch (error) {
        throw new Error(error as string | undefined);
    }
};

export const searchTVShowById = async (id: number | string): Promise<TVShowDetailed> => {
    try {
        if (isAPIMocked) return (await apiMock).tvshowMock as unknown as Promise<TVShowDetailed>;

        const response = await fetch(`${baseURL}/tv-shows/${id}`);
        const tvshow = await response.json();
        return tvshow;
    } catch (error) {
        throw new Error(error as string | undefined);
    }
};

export const getTrendingTVShows = async (timeWindow: TimeWindow, language?: string): Promise<TVShowResponse.TVShowTrends> => {
    try {
        if (isAPIMocked) return (await apiMock).tvshowsMock as unknown as Promise<TVShowResponse.TVShowTrends>;

        const queryString = `?${stringify({ timeWindow, language })}`;
        const response = await fetch(`${baseURL}/tv-shows/trending${queryString}`);
        const { page, results } = await response.json();
        return {
            page,
            results,
        };
    } catch (error) {
        throw new Error(error as string | undefined);
    }
};

import { stringify } from 'qs';
import { tvAppApi } from './tv-app.config';
import requestJson from './requestJson';
import { TVShow, TVShowDetailed, TimeWindow } from '@tv-app-packages/shared-types';

const {
    config: { baseURL, isAPIMocked },
} = tvAppApi;

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
    if (isAPIMocked) return (await apiMock).tvshowsMock as unknown as Promise<TVShowResponse.TVShows>;

    const queryString = `?${stringify({ query: criteria }, { format: 'RFC1738' })}`;
    return requestJson<TVShowResponse.TVShows>(`${baseURL}/tv-shows/search${queryString}`);
};

export const searchTVShowById = async (id: number | string): Promise<TVShowDetailed> => {
    if (isAPIMocked) return (await apiMock).tvshowMock as unknown as Promise<TVShowDetailed>;

    return requestJson<TVShowDetailed>(`${baseURL}/tv-shows/${id}`);
};

export const getTrendingTVShows = async (timeWindow: TimeWindow, language?: string): Promise<TVShowResponse.TVShowTrends> => {
    if (isAPIMocked) return (await apiMock).tvshowsMock as unknown as Promise<TVShowResponse.TVShowTrends>;

    const queryString = `?${stringify({ timeWindow, language })}`;
    return requestJson<TVShowResponse.TVShowTrends>(`${baseURL}/tv-shows/trending${queryString}`);
};

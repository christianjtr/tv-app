import { stringify } from 'qs';
import { tvAppApi } from './tv-app.config';
import requestJson from './requestJson';
import { Movie, MovieDetailed, TimeWindow } from '@tv-app-packages/shared-types';

const {
    config: { baseURL, isAPIMocked },
} = tvAppApi;

// Just for mocking purposes...
const apiMock = (async () => {
    const { default: mocks } = await import('../../../../__mocks__/tv.api.service.mock');
    return mocks;
})();

export namespace MovieResponse {
    export type Movies = {
        page: number;
        results: Movie[];
    };

    export type MovieTrends = {
        page: number;
        results: Movie[];
    };
}

export const searchMovie = async (criteria: string): Promise<MovieResponse.Movies> => {
    if (isAPIMocked) return (await apiMock).moviesMock as unknown as Promise<MovieResponse.Movies>;

    const queryString = `?${stringify({ query: criteria }, { format: 'RFC1738' })}`;
    return requestJson<MovieResponse.Movies>(`${baseURL}/movies/search${queryString}`);
};

export const searchMovieById = async (id: number | string): Promise<MovieDetailed> => {
    if (isAPIMocked) return (await apiMock).movieMock as unknown as Promise<MovieDetailed>;

    return requestJson<MovieDetailed>(`${baseURL}/movies/${id}`);
};

export const getTrendingMovies = async (timeWindow: TimeWindow, language?: string): Promise<MovieResponse.MovieTrends> => {
    if (isAPIMocked) return (await apiMock).moviesMock as unknown as Promise<MovieResponse.MovieTrends>;

    const queryString = `?${stringify({ timeWindow, language })}`;
    return requestJson<MovieResponse.MovieTrends>(`${baseURL}/movies/trending${queryString}`);
};

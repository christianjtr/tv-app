import { stringify } from 'qs';
import { tvAppApi } from './tv-app.config';
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
    try {
        if (isAPIMocked) return (await apiMock).moviesMock as unknown as Promise<MovieResponse.Movies>;

        const queryString = `?${stringify({ query: criteria }, { format: 'RFC1738' })}`;
        const response = await fetch(`${baseURL}/movies/search${queryString}`);
        const { page, results } = await response.json();
        return {
            page,
            results,
        };
    } catch (error) {
        throw new Error(error as string | undefined);
    }
};

export const searchMovieById = async (id: number | string): Promise<MovieDetailed> => {
    try {
        if (isAPIMocked) return (await apiMock).movieMock as unknown as Promise<MovieDetailed>;

        const response = await fetch(`${baseURL}/movies/${id}`);
        const movie = await response.json();
        return movie;
    } catch (error) {
        throw new Error(error as string | undefined);
    }
};

export const getTrendingMovies = async (timeWindow: TimeWindow, language?: string): Promise<MovieResponse.MovieTrends> => {
    try {
        if (isAPIMocked) return (await apiMock).moviesMock as unknown as Promise<MovieResponse.MovieTrends>;

        const queryString = `?${stringify({ timeWindow, language })}`;
        const response = await fetch(`${baseURL}/movies/trending${queryString}`);
        const { page, results } = await response.json();
        return {
            page,
            results,
        };
    } catch (error) {
        throw new Error(error as string | undefined);
    }
};

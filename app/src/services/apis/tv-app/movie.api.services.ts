import { stringify } from 'qs';
import { tvAppApi } from './tv-app.config';
import { Movie, MovieDetailed, TimeWindow } from '@tv-app-packages/shared-types';

const {
    config: { baseURL },
} = tvAppApi;

// Mocking purposes...
import MOVIE from '../../../../__fixtures__/movie.json';
import MOVIES from '../../../../__fixtures__/movies.json';

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
        // const queryString = `?${stringify({ query: criteria }, { format: 'RFC1738' })}`;
        // const response = await fetch(`${baseURL}/movies/search${queryString}`);
        // const { page, results } = await response.json();
        // return {
        //     page,
        //     results,
        // };
        return MOVIES as unknown as MovieResponse.Movies;
    } catch (error) {
        throw new Error(error as string | undefined);
    }
};

export const searchMovieById = async (id: number | string): Promise<MovieDetailed> => {
    try {
        // const response = await fetch(`${baseURL}/movies/${id}`);
        // const movie = await response.json();
        // return movie;
        return MOVIE as unknown as MovieDetailed;
    } catch (error) {
        throw new Error(error as string | undefined);
    }
};

export const getTrendingMovies = async (timeWindow: TimeWindow, language?: string): Promise<MovieResponse.MovieTrends> => {
    try {
        // const queryString = `?${stringify({ timeWindow, language })}`;
        // const response = await fetch(`${baseURL}/movies/trending${queryString}`);
        // const { page, results } = await response.json();
        // return {
        //     page,
        //     results,
        // };
        return MOVIES as unknown as MovieResponse.MovieTrends;
    } catch (error) {
        throw new Error(error as string | undefined);
    }
};

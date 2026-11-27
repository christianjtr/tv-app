import { renderHook, waitFor } from '@testing-library/react';
import * as MovieServices from '@services/apis/tv-app/movie.api.services';
import { useFetchTrendingMovies, useSearchMovies } from '@hooks/useFetchMovies';

jest.mock('@services/apis/tv-app/movie.api.services', () => ({
    getTrendingMovies: jest.fn(),
    searchMovie: jest.fn(),
}));

const getTrendingMovies = MovieServices.getTrendingMovies as jest.MockedFunction<typeof MovieServices.getTrendingMovies>;
const searchMovie = MovieServices.searchMovie as jest.MockedFunction<typeof MovieServices.searchMovie>;

describe('movie catalog hooks', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        getTrendingMovies.mockResolvedValue({ page: 1, results: [] });
        searchMovie.mockResolvedValue({ page: 1, results: [] });
    });

    it('loads trending movies', async () => {
        const { result } = renderHook(() => useFetchTrendingMovies('day', 'en-US'));

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(getTrendingMovies).toHaveBeenCalledWith('day', 'en-US');
        expect(result.current).toMatchObject({ movies: [], hasMovies: false, hasError: false });
    });

    it('exposes a trending request failure as state', async () => {
        getTrendingMovies.mockRejectedValueOnce(new Error('offline'));

        const { result } = renderHook(() => useFetchTrendingMovies());

        await waitFor(() => expect(result.current.hasError).toBe(true));

        expect(result.current.isLoading).toBe(false);
    });

    it('clears search errors when the query changes', async () => {
        searchMovie.mockRejectedValueOnce(new Error('offline'));

        const { result, rerender } = renderHook(({ criteria }) => useSearchMovies(criteria), { initialProps: { criteria: 'first' } });

        await waitFor(() => expect(result.current.hasError).toBe(true));
        expect(result.current.isLoading).toBe(false);

        rerender({ criteria: 'second' });

        await waitFor(() => expect(searchMovie).toHaveBeenCalledTimes(2));
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.hasError).toBe(false);
    });
});

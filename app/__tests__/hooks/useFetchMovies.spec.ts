import { renderHook, waitFor } from '@testing-library/react';
import * as MovieServices from '@services/apis/tv-app/movie.api.services';
import { useFetchTrendingMovies } from '@hooks/useFetchMovies';

// COMMENT: Just an example on how to test a custom hook within the client-side app...

jest.mock('@services/apis/tv-app/movie.api.services', () => ({
    getTrendingMovies: jest.fn().mockResolvedValue({ results: [] }),
}));

describe('useFetchTrendingMovies custom hook', () => {
    it('should has the proper props and functions and get trending movies', () => {
        const {
            result: { current },
            unmount,
        } = renderHook(() => useFetchTrendingMovies('day', 'en-US'));

        const { movies, isLoading, hasMovies } = current;

        // First state change...
        waitFor(() => {
            expect(movies).toStrictEqual([]);
            expect(isLoading).toBe(true);
            expect(hasMovies).toBe(false);
        });

        // Last state change...
        waitFor(() => {
            expect(movies).toStrictEqual([]);
            expect(isLoading).toBe(false);
            expect(hasMovies).toBe(false);

            expect(MovieServices.getTrendingMovies).toHaveBeenCalledWith('day', 'en-US');
        });

        unmount();
    });

    it('[sad path] should fail at getting trending movies', async () => {
        jest.resetModules();
        jest.doMock('@services/apis/tv-app/movie.api.services', () => ({
            getTrendingMovies: jest.fn().mockRejectedValue('ERROR'),
        }));

        const MovieServices = require('@services/apis/tv-app/movie.api.services');

        const { unmount } = renderHook(() => useFetchTrendingMovies('day', 'en-US'));

        await waitFor(() => {
            expect(MovieServices.getTrendingMovies).rejects.toBe('ERROR');
        });

        unmount();
    });
});

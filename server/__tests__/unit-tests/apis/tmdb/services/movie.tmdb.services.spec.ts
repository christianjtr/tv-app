import TMDBMovies from '../../../../../__fixtures__/trendingMovies.json';
import MovieServices from '../../../../../src/apis/tmdb/services/movie.services';
import { default as HTTPClient } from '../../../../../src/apis/tmdb/httpClient';

jest.mock('../../../../../src/apis/tmdb/httpClient', () => ({
    __esModule: true,
    default: {
        get: jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(TMDBMovies),
        }),
    },
}));

// COMMENT: Just an example on how to test a the external service within app...

describe('TMDB Movie services', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('[search] :: should get movies from TMDB external API resource', async () => {
        const criteria = '__SEARCH_CRITERIA__';
        const response = await MovieServices.search(criteria);

        expect(response).toEqual({
            page: expect.any(Number),
            results: expect.any(Array),
            total_pages: expect.any(Number),
            total_results: expect.any(Number),
        });
    });

    it('[search][sad path] :: should fails at getting movies from TMDB external API resource', async () => {
        const criteria = '__SEARCH_CRITERIA__';

        HTTPClient.get = jest.fn().mockRejectedValue('ERROR');
        console.error = jest.fn();

        await expect(MovieServices.search(criteria)).rejects.toBe('ERROR');
        expect(console.error).toHaveBeenCalled();
    });
});

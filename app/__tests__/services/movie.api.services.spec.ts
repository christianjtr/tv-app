import { default as Mocks } from '../../__mocks__/tv.api.service.mock';
import * as MovieServices from '../../src/services/apis/tv-app/movie.api.services';

jest.mock('../../src/services/apis/tv-app/tv-app.config.ts', () => ({
    tvAppApi: {
        config: {
            baseURL: '/base_url',
            isAPIMocked: false,
        },
    },
}));

// COMMENT: Just an example on how to test a service within the client-side app...

describe('API Movie services', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('[search service] :: should get a movie given a search criteria', async () => {
        global.fetch = jest.fn().mockImplementation(() => ({
            json: () => Promise.resolve(Mocks.moviesMock),
        }));

        const criteria = '__SEARCH_CRITERIA__';
        const endpoint = `/base_url/movies/search?query=${criteria}`;

        const response = await MovieServices.searchMovie(criteria);

        expect(global.fetch).toHaveBeenCalledWith(endpoint);
        expect(response).toEqual({
            page: expect.any(Number),
            results: expect.any(Array),
        });
    });

    it('[search by id service] :: should get a movie given an Id', async () => {
        global.fetch = jest.fn().mockImplementation(() => ({
            json: () => Promise.resolve(Mocks.movieMock),
        }));

        const id = '__SEARCH_CRITERIA__';
        const endpoint = `/base_url/movies/${id}`;

        const response = await MovieServices.searchMovieById(id);

        expect(global.fetch).toHaveBeenCalledWith(endpoint);
        expect(response).toMatchObject(Mocks.movieMock);
    });

    it('[search trending movies service] :: should get trending movies default value', async () => {
        global.fetch = jest.fn().mockImplementation(() => ({
            json: () => Promise.resolve(Mocks.moviesMock),
        }));

        const timeWindow = 'day';
        const endpoint = `/base_url/movies/trending?timeWindow=${timeWindow}`;

        const response = await MovieServices.getTrendingMovies(timeWindow);

        expect(global.fetch).toHaveBeenCalledWith(endpoint);
        expect(response).toEqual({
            page: expect.any(Number),
            results: expect.any(Array),
        });
    });

    it('[sad path][search service] :: should fail when getting a movie given a search criteria', async () => {
        global.fetch = jest.fn().mockRejectedValue('ERROR');

        await expect(MovieServices.searchMovie('ANY_VALUE')).rejects.toStrictEqual(new Error('ERROR'));
    });
});

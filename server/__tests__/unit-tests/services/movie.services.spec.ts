import { mockedServices } from '../../../__mocks__/services/mockedServices';
import { MovieServices } from '../../../src/services';
import TVShowServices from '../../../src/services/tvshow.services';

jest.mock('@apis', () => ({
    tmdbAPI: mockedServices().tmdbAPIMock,
}));

jest.mock('../../../src/services/cache.services', () => ({
    __esModule: true,
    default: mockedServices().cacheServiceMock,
}));

// COMMENT: Just an example on how to test a service within the server tier of the app...

describe('Movie services', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('[search] :: should get movies from TMDB API', async () => {
        const criteria = '__SEARCH_CRITERIA__';
        const response = await MovieServices.search(criteria);

        expect(mockedServices().cacheServiceMock.generateKey).toHaveBeenCalledWith(['movie', 'search', `criteria:${criteria}`]);
        expect(mockedServices().cacheServiceMock.retrieveDatFromCache).toHaveBeenCalled();
        expect(mockedServices().tmdbAPIMock.services.MovieServices.search).toHaveBeenCalledWith(criteria);
        expect(mockedServices().cacheServiceMock.performCacheStorage).toHaveBeenCalled();
        expect(response).toEqual({
            page: expect.any(Number),
            results: expect.any(Array),
        });
    });

    it('[search] :: should get movies from cache service', async () => {
        const criteria = '__SEARCH_CRITERIA__';
        mockedServices().cacheServiceMock.retrieveDatFromCache = jest.fn().mockReturnValue({ page: 1, results: [] });

        const response = await MovieServices.search(criteria);

        expect(mockedServices().cacheServiceMock.generateKey).toHaveBeenCalledWith(['movie', 'search', `criteria:${criteria}`]);
        expect(mockedServices().cacheServiceMock.retrieveDatFromCache).toHaveBeenCalled();

        expect(mockedServices().tmdbAPIMock.services.MovieServices.search).not.toHaveBeenCalledWith(criteria);
        expect(mockedServices().cacheServiceMock.performCacheStorage).not.toHaveBeenCalled();
        expect(response).toEqual({
            page: expect.any(Number),
            results: expect.any(Array),
        });
    });

    it('[search][sad path] :: should throw an error if service fails', async () => {
        const criteria = '__SEARCH_CRITERIA__';
        console.error = jest.fn();
        mockedServices().tmdbAPIMock.services.MovieServices.search = jest.fn().mockRejectedValue('ERROR');

        await expect(MovieServices.search(criteria)).rejects.toBe('ERROR');

        expect(console.error).toHaveBeenCalled();
    });

    it('uses different cache keys for movie and TV searches', async () => {
        const criteria = '__SAME_CRITERIA__';
        mockedServices().cacheServiceMock.retrieveDatFromCache = jest.fn().mockReturnValue(undefined);
        mockedServices().tmdbAPIMock.services.MovieServices.search = jest.fn().mockResolvedValue({ page: 1, results: [] });
        mockedServices().tmdbAPIMock.services.TVShowServices.search = jest.fn().mockResolvedValue({ page: 1, results: [] });

        await MovieServices.search(criteria);
        await TVShowServices.search(criteria);

        expect(mockedServices().cacheServiceMock.generateKey).toHaveBeenNthCalledWith(1, ['movie', 'search', `criteria:${criteria}`]);
        expect(mockedServices().cacheServiceMock.generateKey).toHaveBeenNthCalledWith(2, ['tv-show', 'search', `criteria:${criteria}`]);
    });
});

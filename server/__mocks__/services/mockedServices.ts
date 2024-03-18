// @ts-ignore
import { Mock } from 'moq.ts';
import Movies from '../../__fixtures__/trendingMovies.json';
import TVShows from '../../__fixtures__/trendingTVShows.json';
import movieDetailed from '../../__fixtures__/movieDetailed.json';
import tvShowDetailed from '../../__fixtures__/tvShowDetailed.json';
import movies from '../../__fixtures__/movies.json';

// Services...
import { tmdbApiInterface } from '../../src/apis/tmdb';
import { CacheServiceInterface } from '../../src/services/cache.services';
import { MovieServiceInterface } from '../../src/services/movie.services';

const tmdbAPIMock = new Mock<tmdbApiInterface>().object();
const cacheServiceMock = new Mock<CacheServiceInterface>().object();
const movieServiceMock = new Mock<MovieServiceInterface>().object();

tmdbAPIMock.config = { TMBD_SECURE_BASE_URL_IMAGE: '__TMBD_SECURE_BASE_URL_IMAGE__' };
tmdbAPIMock.services = {
    MovieServices: {
        search: jest.fn().mockResolvedValue(Movies),
        searchById: jest.fn().mockResolvedValue(movieDetailed),
    },
    TVShowServices: {
        search: jest.fn().mockResolvedValue(TVShows),
        searchById: jest.fn().mockResolvedValue(tvShowDetailed),
    },
    TrendingServices: {
        getTrendingMovies: jest.fn().mockResolvedValue(Movies),
        getTrendingTVShows: jest.fn().mockResolvedValue(TVShows),
    },
};

cacheServiceMock.generateKey = jest.fn();
cacheServiceMock.retrieveDatFromCache = jest.fn();
cacheServiceMock.performCacheStorage = jest.fn();

movieServiceMock.search = jest.fn().mockResolvedValue(movies);
movieServiceMock.searchById = jest.fn();
movieServiceMock.getTrendingMovies = jest.fn().mockResolvedValue(movies);

export function mockedServices() {
    return {
        tmdbAPIMock,
        cacheServiceMock,
        movieServiceMock,
    };
}

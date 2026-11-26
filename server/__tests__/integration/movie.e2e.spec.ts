import HTTPStatus from 'http-status';
import supertest from 'supertest';
import { UpstreamError } from '../../src/apis/tmdb/httpClient';
import tmdbHTTPClient from '../../src/apis/tmdb/httpClient';
import tmdbMoviesResponse from '../../__fixtures__/trendingMovies.json';
import tmdbTVShowsResponse from '../../__fixtures__/trendingTVShows.json';

import app from '../../src/app';

const agent = supertest(app);
const URI = `/api/movies/search`;

// COMMENT: Just an example on how to perform a e2e test against the api...

describe('Integration test ::: movie endpoint services', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('[GET] /search > should get movies given a valid query', async () => {
        const query = `Avengers-${Date.now()}`;
        tmdbHTTPClient.get = jest.fn().mockResolvedValue(tmdbMoviesResponse);

        const response = await agent.get(URI).query({ query });

        expect(response.body).toEqual({
            page: expect.any(Number),
            results: expect.any(Array),
        });
        expect(response.statusCode).toBe(HTTPStatus.OK);
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    it('[GET] /search > rejects a missing query', async () => {
        tmdbHTTPClient.get = jest.fn();

        const response = await agent.get(URI);

        expect(response.statusCode).toBe(HTTPStatus.BAD_REQUEST);
        expect(response.body).toEqual({ error: { message: 'Invalid request' } });
        expect(tmdbHTTPClient.get).not.toHaveBeenCalled();
    });

    it('[GET] /:id > rejects a non-numeric id', async () => {
        const response = await agent.get('/api/movies/not-a-number');

        expect(response.statusCode).toBe(HTTPStatus.BAD_REQUEST);
        expect(response.body).toEqual({ error: { message: 'Invalid request' } });
    });

    it('[GET] /trending > rejects an invalid time window', async () => {
        const response = await agent.get('/api/movies/trending').query({ timeWindow: 'invalid' });

        expect(response.statusCode).toBe(HTTPStatus.BAD_REQUEST);
        expect(response.body).toEqual({ error: { message: 'Invalid request' } });
    });

    it('[GET] /search > returns a normalized upstream error', async () => {
        const query = `upstream-failure-${Date.now()}`;
        tmdbHTTPClient.get = jest.fn().mockRejectedValue(new UpstreamError());

        const response = await agent.get(URI).query({ query });

        expect(response.statusCode).toBe(HTTPStatus.BAD_GATEWAY);
        expect(response.body).toEqual({ error: { message: 'Catalog provider unavailable' } });
    });

    it('keeps movie and TV search cache entries separate', async () => {
        const query = `cache-isolation-${Date.now()}`;
        tmdbHTTPClient.get = jest.fn().mockResolvedValueOnce(tmdbMoviesResponse).mockResolvedValueOnce(tmdbTVShowsResponse);

        const movieResponse = await agent.get('/api/movies/search').query({ query });
        const tvResponse = await agent.get('/api/tv-shows/search').query({ query });

        expect(movieResponse.statusCode).toBe(HTTPStatus.OK);
        expect(tvResponse.statusCode).toBe(HTTPStatus.OK);
        expect(movieResponse.body.results[0]).toHaveProperty('title');
        expect(tvResponse.body.results[0]).toHaveProperty('name');
        expect(tmdbHTTPClient.get).toHaveBeenCalledTimes(2);
    });
});

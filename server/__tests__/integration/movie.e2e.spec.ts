/* eslint-disable no-console */
import HTTPStatus from 'http-status';
import supertest from 'supertest';
import tmdbHTTPClient from '../../src/apis/tmdb/httpClient';
import tmdbMoviesResponse from '../../__fixtures__/trendingMovies.json';

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

    it('[GET] /search > should get movies given any criteria', async () => {
        tmdbHTTPClient.get = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(tmdbMoviesResponse),
        });

        const response = await agent.get(`${URI}?query=Avengers`);

        expect(response.body).toEqual({
            page: expect.any(Number),
            results: expect.any(Array),
        });
        expect(response.statusCode).toBe(HTTPStatus.OK);
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    it('[sad path] :: [GET] /search > should fails at getting movies given any criteria when TMDB API fails too', () => {
        tmdbHTTPClient.get = jest.fn().mockRejectedValue('ERROR');

        agent.get(`${URI}?query=Avengers`).catch(() => {
            expect(console.error).toHaveBeenCalled();
        });
    });
});

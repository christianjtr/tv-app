import HTTPStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import { createRequest, createResponse, MockRequest, MockResponse } from 'node-mocks-http';
import { mockedServices } from '../../../__mocks__/services/mockedServices';
import movies from '../../../__fixtures__/movies.json';
import * as MovieController from '../../../src/controllers/movie.controller';
import { MovieServices } from '@services';

jest.mock('@services', () => ({
    MovieServices: mockedServices().movieServiceMock,
}));

// COMMENT: Just an example on how to test a controller within the ctlrs tier of the app...

describe('Movie controller', () => {
    let request: MockRequest<Request>, response: MockResponse<Response>, next: NextFunction;

    beforeEach(() => {
        response = createResponse();
    });

    it('[search] :: should execute movie controller correctly', async () => {
        const query = '__SEARCH_CRITERIA__';
        request = createRequest({
            query: {
                query,
            },
        });

        response.status = jest.fn().mockReturnValue(response);
        response.send = jest.fn().mockReturnValue(response);
        next = jest.fn();

        await MovieController.search(request, response, next);

        expect(MovieServices.search).toHaveBeenCalledWith(query);
        expect(response.status).toHaveBeenCalledWith(HTTPStatus.OK);
        expect(response.send).toHaveBeenCalledWith(movies);
    });

    it('[search][sad path] :: should fails', async () => {
        const query = '__SEARCH_CRITERIA__';
        request = createRequest({
            query: {
                query,
            },
        });

        MovieServices.search = jest.fn().mockRejectedValue('ERROR');

        response.status = jest.fn().mockReturnValue(response);
        response.send = jest.fn().mockReturnValue(response);
        next = jest.fn();

        await MovieController.search(request, response, next);

        expect(response.status).toHaveBeenCalledWith(HTTPStatus.INTERNAL_SERVER_ERROR);
        expect(response.send).toHaveBeenCalledWith({
            error: {
                message: 'Error occurred when getting movies.',
            },
        });
        expect(next).toHaveBeenCalledWith('ERROR');
    });
});

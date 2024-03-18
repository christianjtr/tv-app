import { Request, Response, NextFunction } from 'express';
import HTTPStatus from 'http-status';
import Joi from '@hapi/joi';

import { MovieServices } from '@services';
import { TimeWindow, TimeWindowOptions } from '@tv-app-packages/shared-types';

//#region Validations

export async function checkQueryParams(request: Request, _: Response, next: NextFunction): Promise<void> {
    try {
        const queryObject = Joi.object({
            timeWindow: Joi.string()
                .valid(...TimeWindowOptions)
                .required(),
            language: Joi.string().optional(),
        });

        const { timeWindow, language } = await queryObject.validateAsync(request.query);

        request.safeFields = {
            ...(request.safeFields || {}),
            timeWindow,
            language,
        };

        next();
    } catch (error) {
        next(error);
    }
}

//#endregion

export async function search(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const { query } = request.query;

        const movies = await MovieServices.search(query as string);

        response.status(HTTPStatus.OK).send(movies);
    } catch (error) {
        response.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
            error: {
                message: (error as Error).message || 'Error occurred when getting movies.',
            },
        });
        next(error);
    }
}

export async function searchById(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = request.params;

        const movie = await MovieServices.searchById(id);

        response.status(HTTPStatus.OK).send(movie);
    } catch (error) {
        response.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
            error: {
                message: (error as Error).message || 'Error occurred when getting the movie.',
            },
        });
        next(error);
    }
}

export async function getTrendingMovies(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const { safeFields } = request;
        const { timeWindow, language } = safeFields as { timeWindow: TimeWindow; language: string };

        const trendingMovies = await MovieServices.getTrendingMovies(timeWindow, language);

        response.status(HTTPStatus.OK).send(trendingMovies);
    } catch (error) {
        response.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
            error: {
                message: (error as Error).message || 'Error occurred when getting trending movies.',
            },
        });
        next(error);
    }
}

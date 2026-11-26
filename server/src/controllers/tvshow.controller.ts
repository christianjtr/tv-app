import { Request, Response, NextFunction } from 'express';
import HTTPStatus from 'http-status';
import Joi from '@hapi/joi';

import { TVShowServices } from '@services';
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

        const tvshows = await TVShowServices.search(query as string);

        response.status(HTTPStatus.OK).send(tvshows);
    } catch (error) {
        next(error);
    }
}

export async function searchById(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = request.params;

        const tvshow = await TVShowServices.searchById(id);

        response.status(HTTPStatus.OK).send(tvshow);
    } catch (error) {
        next(error);
    }
}

export async function getTrendingTVShows(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const { safeFields } = request;
        const { timeWindow, language } = safeFields as { timeWindow: TimeWindow; language: string };

        const trendingTVShows = await TVShowServices.getTrendingTVShows(timeWindow, language);

        response.status(HTTPStatus.OK).send(trendingTVShows);
    } catch (error) {
        next(error);
    }
}

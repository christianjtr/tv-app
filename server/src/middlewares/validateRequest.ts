import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import HTTPStatus from 'http-status';

const validateRequest: RequestHandler = (request, response, next) => {
    if (!validationResult(request).isEmpty()) {
        response.status(HTTPStatus.BAD_REQUEST).json({ error: { message: 'Invalid request' } });
        return;
    }

    next();
};

export default validateRequest;

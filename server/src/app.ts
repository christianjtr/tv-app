import express, { json, NextFunction, Request, Response, urlencoded } from 'express';
import HTTPStatus from 'http-status';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import routes from './routes';
import { UpstreamError } from './apis/tmdb/httpClient';

const app = express();
const baseURI = '/api';

app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(
    urlencoded({
        extended: false,
    })
);

app.use(baseURI, routes);
app.use(`${baseURI}/docs`, swaggerUI.serve, swaggerUI.setup(YAML.load('./swagger.api.specs.yml')));
app.use((error: unknown, _request: Request, response: Response, next: NextFunction) => {
    if (response.headersSent) return next(error);

    const isJoiError = typeof error === 'object' && error !== null && 'isJoi' in error && error.isJoi === true;
    const status = error instanceof UpstreamError ? HTTPStatus.BAD_GATEWAY : isJoiError ? HTTPStatus.BAD_REQUEST : HTTPStatus.INTERNAL_SERVER_ERROR;
    const message = error instanceof UpstreamError ? 'Catalog provider unavailable' : isJoiError ? 'Invalid request' : 'Internal server error';

    if (status === HTTPStatus.INTERNAL_SERVER_ERROR) console.error('[API][ERROR]', error);
    response.status(status).json({ error: { message } });
});

export default app;

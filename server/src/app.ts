import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import routes from './routes';

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

export default app;

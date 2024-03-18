import path from 'path';
import * as dotenv from 'dotenv';

process.env = dotenv.config({
    path: path.resolve(__dirname, '.env.test'),
}).parsed as dotenv.DotenvParseOutput;

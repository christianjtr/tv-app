import fetch from 'node-fetch';
import { TMDB_API_CONFIGURATION } from './configuration';

const baseURL = `${TMDB_API_CONFIGURATION.TMDB_BASE_URL}/${TMDB_API_CONFIGURATION.TMDB_API_VERSION}`;
const REQUEST_TIMEOUT_MS = 10_000;
const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_API_CONFIGURATION.TMDB_API_ACCESS_TOKEN}`,
};

export class UpstreamError extends Error {
    constructor() {
        super('Catalog provider request failed');
        this.name = 'UpstreamError';
    }
}

export interface HTTPClientInterface {
    get: <T>(uri: string) => Promise<T>;
}

export default {
    get: async <T>(uri: string): Promise<T> => {
        try {
            const url = `${baseURL}${uri}`;
            const response = await fetch(url, {
                method: 'GET',
                headers,
                signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
            });

            if (!response.ok) {
                response.body.resume();
                throw new UpstreamError();
            }

            return (await response.json()) as T;
        } catch (error) {
            console.error('[HTTPCLIENT][TMDB][ERROR]', error);
            if (error instanceof UpstreamError) throw error;
            throw new UpstreamError();
        }
    },
} as HTTPClientInterface;

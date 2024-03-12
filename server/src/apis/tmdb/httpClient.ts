import fetch, { RequestInit, Response } from 'node-fetch';
import { TMDB_API_CONFIGURATION } from './configuration';

const baseURL = `${TMDB_API_CONFIGURATION.TMDB_BASE_URL}/${TMDB_API_CONFIGURATION.TMDB_API_VERSION}`;
const headers: RequestInit['headers'] = {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_API_CONFIGURATION.TMDB_API_ACCESS_TOKEN}`,
};

export interface HTTPClientInterface {
    get: (uri: string, config?: RequestInit) => Promise<Response>;
}

export default {
    get: async (uri: string, config?: RequestInit): Promise<Response> => {
        try {
            const url = `${baseURL}${uri}`;
            const response = await fetch(url, {
                ...config,
                method: 'GET',
                headers,
            });

            return response;
        } catch (error) {
            console.error('[HTTPCLIENT][TMDB][ERROR]', error);
            throw error;
        }
    },
} as HTTPClientInterface;

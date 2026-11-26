import HTTPStatus from 'http-status';
import requestJson from '@services/apis/tv-app/requestJson';

describe('requestJson', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('returns JSON for successful responses', async () => {
        const body = { page: 1, results: [] };
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(body),
        });

        await expect(requestJson('/api/movies/search')).resolves.toEqual(body);
    });

    it('rejects API error responses with the normalized message', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            status: HTTPStatus.BAD_GATEWAY,
            json: jest.fn().mockResolvedValue({ error: { message: 'Catalog provider unavailable', code: 'UPSTREAM' }, traceId: 'test' }),
        });

        await expect(requestJson('/api/movies/search')).rejects.toThrow('Catalog provider unavailable');
    });

    it('falls back to status when Joi rejects the error envelope', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            status: HTTPStatus.SERVICE_UNAVAILABLE,
            json: jest.fn().mockResolvedValue({ error: { message: HTTPStatus.SERVICE_UNAVAILABLE } }),
        });

        await expect(requestJson('/api/movies/search')).rejects.toThrow(`Request failed (${HTTPStatus.SERVICE_UNAVAILABLE})`);
    });
});

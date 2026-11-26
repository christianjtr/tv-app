import fetch, { Response } from 'node-fetch';
import HTTPClient, { UpstreamError } from '../../../../src/apis/tmdb/httpClient';

jest.mock('node-fetch', () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('TMDB HTTP client', () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it('parses successful JSON and applies a request deadline', async () => {
        const timeout = jest.spyOn(AbortSignal, 'timeout');
        const body = { page: 1, results: [] };
        mockedFetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(body),
        } as unknown as Response);

        await expect(HTTPClient.get('/search/movie')).resolves.toEqual(body);

        const [, options] = mockedFetch.mock.calls[0];
        expect(options?.signal).toBeInstanceOf(AbortSignal);
        expect(timeout).toHaveBeenCalledWith(10_000);
    });

    it('normalizes non-success HTTP responses', async () => {
        const resume = jest.fn();
        mockedFetch.mockResolvedValue({ ok: false, status: 503, body: { resume } } as unknown as Response);

        await expect(HTTPClient.get('/search/movie')).rejects.toBeInstanceOf(UpstreamError);
        expect(resume).toHaveBeenCalled();
    });

    it('normalizes network failures', async () => {
        jest.spyOn(console, 'error').mockImplementation();
        mockedFetch.mockRejectedValue(new Error('private upstream detail'));

        await expect(HTTPClient.get('/search/movie')).rejects.toBeInstanceOf(UpstreamError);
    });
});

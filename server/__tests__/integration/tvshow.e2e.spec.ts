import supertest from 'supertest';
import app from '../../src/app';
import tmdbHTTPClient from '../../src/apis/tmdb/httpClient';

const agent = supertest(app);
const uri = (id: number | string, season: number | string) => `/api/tv-shows/${id}/seasons/${season}/episode-ratings`;

afterEach(() => jest.restoreAllMocks());

it('maps season episode ratings and caches them per TV show and season number', async () => {
    const get = jest
        .spyOn(tmdbHTTPClient, 'get')
        .mockResolvedValueOnce({
            episodes: [
                { episode_number: 1, name: 'Winter Is Coming', air_date: '2011-04-17', vote_average: 8.9, vote_count: 20, overview: 'Excluded' },
                { episode_number: 2, name: '', air_date: null, vote_average: 0, vote_count: 0 },
            ],
        })
        .mockResolvedValue({ episodes: [] });

    const expected = [
        { episodeNumber: 1, name: 'Winter Is Coming', airDate: '2011-04-17', rating: 8.9 },
        { episodeNumber: 2, name: 'Episode 2', airDate: null, rating: null },
    ];
    await agent.get(uri(1399, 1)).expect(200, expected);
    await agent.get(uri(1399, 0)).expect(200, []);
    await agent.get(uri(1400, 1)).expect(200, []);
    await agent.get(uri(1399, 1)).expect(200, expected);
    expect(get.mock.calls).toEqual([['/tv/1399/season/1'], ['/tv/1399/season/0'], ['/tv/1400/season/1']]);
});

it.each([
    [0, 1],
    [1399, -1],
    [1399, 1.5],
    [1399, 2_147_483_648],
])('rejects invalid ID %s or season %s before requesting TMDB', async (id, season) => {
    const get = jest.spyOn(tmdbHTTPClient, 'get');
    await agent.get(uri(id, season)).expect(400, { error: { message: 'Invalid request' } });
    expect(get).not.toHaveBeenCalled();
});

it('returns a normalized error for malformed season data and allows retry', async () => {
    const get = jest.spyOn(tmdbHTTPClient, 'get').mockResolvedValueOnce({ episodes: null }).mockResolvedValueOnce({ episodes: [] });
    await agent.get(uri(1399, 5)).expect(502, { error: { message: 'Catalog provider unavailable' } });
    await agent.get(uri(1399, 5)).expect(200, []);
    expect(get).toHaveBeenCalledTimes(2);
});

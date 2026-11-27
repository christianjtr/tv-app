import { renderHook, waitFor } from '@testing-library/react';
import * as TVShowServices from '@services/apis/tv-app/tvshow.api.services';
import { useFetchTrendingTVShows, useSearchTVShows } from '@hooks/useFetchTVShows';

jest.mock('@services/apis/tv-app/tvshow.api.services', () => ({
    getTrendingTVShows: jest.fn(),
    searchTVShow: jest.fn(),
}));

const getTrendingTVShows = TVShowServices.getTrendingTVShows as jest.MockedFunction<typeof TVShowServices.getTrendingTVShows>;
const searchTVShow = TVShowServices.searchTVShow as jest.MockedFunction<typeof TVShowServices.searchTVShow>;

describe('TV show catalog hooks', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        getTrendingTVShows.mockResolvedValue({ page: 1, results: [] });
        searchTVShow.mockResolvedValue({ page: 1, results: [] });
    });

    it('exposes a trending request failure as state', async () => {
        getTrendingTVShows.mockRejectedValueOnce(new Error('offline'));

        const { result } = renderHook(() => useFetchTrendingTVShows());

        await waitFor(() => expect(result.current.hasError).toBe(true));

        expect(result.current.isLoading).toBe(false);
    });

    it('exposes a search request failure as state', async () => {
        searchTVShow.mockRejectedValueOnce(new Error('offline'));

        const { result } = renderHook(() => useSearchTVShows('query'));

        await waitFor(() => expect(result.current.hasError).toBe(true));

        expect(result.current.isLoading).toBe(false);
    });
});

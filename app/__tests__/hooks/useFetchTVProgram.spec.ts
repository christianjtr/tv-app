import { act, renderHook, waitFor } from '@testing-library/react';
import { getTVProgramById } from '@services/apis/tv-app/tvprogram.api.services';
import { TVProgramDetailed } from '@app-types/TVProgram';
import { useFetchTVProgram } from '@hooks/useFetchTVProgram';

jest.mock('@services/apis/tv-app/tvprogram.api.services', () => ({
    getTVProgramById: jest.fn(),
}));

const getProgram = getTVProgramById as jest.MockedFunction<typeof getTVProgramById>;

const deferred = <T>() => {
    let resolve!: (_value: T) => void;
    const promise = new Promise<T>((complete) => {
        resolve = complete;
    });
    return { promise, resolve };
};

describe('useFetchTVProgram', () => {
    beforeEach(() => {
        getProgram.mockReset();
    });

    it('ignores an older detail response after the route id changes', async () => {
        const oldRequest = deferred<TVProgramDetailed>();
        const newRequest = deferred<TVProgramDetailed>();

        getProgram.mockImplementation((id) => (id === 'old' ? oldRequest.promise : newRequest.promise));

        const { result, rerender } = renderHook(({ id }) => useFetchTVProgram(id, 'tv-shows'), { initialProps: { id: 'old' } });
        await waitFor(() => expect(getProgram).toHaveBeenCalledWith('old', 'tv-shows'));

        rerender({ id: 'new' });
        await waitFor(() => expect(getProgram).toHaveBeenCalledWith('new', 'tv-shows'));

        await act(async () => {
            oldRequest.resolve({ id: 1, name: 'Old result' } as TVProgramDetailed);
            await oldRequest.promise;
        });
        expect(result.current.tvProgram).toBeNull();
        expect(result.current.isLoading).toBe(true);

        await act(async () => {
            newRequest.resolve({ id: 2, name: 'New result' } as TVProgramDetailed);
            await newRequest.promise;
        });
        expect(result.current.tvProgram?.name).toBe('New result');
        expect(result.current.isLoading).toBe(false);
    });

    it('exposes a detail request failure as state', async () => {
        getProgram.mockRejectedValueOnce(new Error('offline'));

        const { result } = renderHook(() => useFetchTVProgram('1399', 'tv-shows'));

        await waitFor(() => expect(result.current.hasError).toBe(true));

        expect(result.current.isLoading).toBe(false);
    });
});

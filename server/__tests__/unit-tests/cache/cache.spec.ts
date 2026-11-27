import type { CacheBaseInterface } from '../../../src/cache';

const originalCacheTTL = process.env.CACHE_STDTTL;

const loadCache = (): CacheBaseInterface => {
    let cache: CacheBaseInterface | undefined;
    jest.isolateModules(() => {
        // biome-ignore lint/style/noCommonJs: reload the module with test-specific cache TTL values
        cache = require('../../../src/cache').default as CacheBaseInterface;
    });
    if (!cache) throw new Error('Cache failed to load');
    return cache;
};

describe('cache', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
        if (originalCacheTTL === undefined) delete process.env.CACHE_STDTTL;
        else process.env.CACHE_STDTTL = originalCacheTTL;
    });

    it('uses a finite default TTL when the environment value is unset', () => {
        delete process.env.CACHE_STDTTL;

        const cache = loadCache();

        expect(cache.storageData('key', 'value')).toBe(true);
        expect(cache.getData('key')).toBe('value');
    });

    it('rejects an invalid TTL instead of creating entries that never expire', () => {
        process.env.CACHE_STDTTL = 'invalid';

        expect(() => loadCache()).toThrow('CACHE_STDTTL must be a positive number of seconds.');
    });

    it('keeps a fixed key limit and logs only the cache key', () => {
        process.env.CACHE_STDTTL = '60';
        const log = jest.spyOn(console, 'info').mockImplementation();
        const cache = loadCache();

        for (let index = 0; index < 500; index++) {
            cache.storageData(`key-${index}`, { index });
        }

        expect(cache.storageData('overflow', { privatePayload: true })).toBe(false);
        expect(cache.getData('key-0')).toEqual({ index: 0 });
        expect(log).toHaveBeenCalledWith('[INFO]: Data has been cached', { key: 'key-0' });
        expect(log).not.toHaveBeenCalledWith('[INFO]: Data has been cached', expect.objectContaining({ value: expect.anything() }));
    });
});

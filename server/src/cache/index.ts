import NodeCache from 'node-cache';

export interface CacheBaseInterface {
    storageData: (key: string, value: unknown) => boolean;
    getData: (key: string) => unknown;
    checkCachedData: (key: string) => boolean;
    deleteCachedData: (key: string) => number;
}

const cacheTTL = Number(process.env.CACHE_STDTTL || 300);
// shortcut: cap at 500 entries, increase only after measuring production cache and heap usage.
const maxCacheKeys = 500;

if (!Number.isFinite(cacheTTL) || cacheTTL <= 0) {
    throw new Error('CACHE_STDTTL must be a positive number of seconds.');
}

const cacheInstance = new NodeCache({ stdTTL: cacheTTL, checkperiod: cacheTTL, maxKeys: maxCacheKeys });

export default {
    storageData: (key: string, value: unknown): boolean => {
        try {
            const hasStoraged = cacheInstance.set(key, value);
            console.info('[INFO]: Data has been cached', { key });
            return hasStoraged;
        } catch (error) {
            if (error instanceof Error && 'errorcode' in error && error.errorcode === 'ECACHEFULL') return false;
            throw error;
        }
    },
    getData: (key: string): unknown | undefined => {
        const data = cacheInstance.get(key);
        return data;
    },
    checkCachedData: (key: string): boolean => {
        return cacheInstance.has(key);
    },
    deleteCachedData: (key: string): number => {
        const deletedEntries = cacheInstance.del(key);
        console.info('[INFO]: Data has been deleted', { key });
        return deletedEntries;
    },
} as CacheBaseInterface;

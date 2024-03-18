import NodeCache from 'node-cache';

export interface CacheBaseInterface {
    storageData: (key: string, value: unknown) => boolean;
    getData: (key: string) => unknown;
    checkCachedData: (key: string) => boolean;
    deleteCachedData: (key: string) => number;
}

const cacheInstance = new NodeCache({ stdTTL: +process.env.CACHE_STDTTL! });

export default {
    storageData: (key: string, value: unknown): boolean => {
        const hasStoraged = cacheInstance.set(key, value);
        console.info('[INFO]: Data has been cached', { key, value: JSON.stringify(value) });
        return hasStoraged;
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

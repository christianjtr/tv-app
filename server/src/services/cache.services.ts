import { default as CacheServices, CacheBaseInterface } from '@cache';

export interface CacheServiceInterface extends CacheBaseInterface {
    generateKey: (values: string[]) => string;
    performCacheStorage: (key: string, value: unknown) => boolean;
    retrieveDatFromCache: (key: string) => unknown | undefined;
}

export default {
    generateKey: (values: string[]): string => {
        return `__CACHED__${values.join('_')}`;
    },
    performCacheStorage: (key: string, value: unknown): boolean => {
        const hasCachedData = CacheServices.checkCachedData(key);
        if (hasCachedData) {
            return true;
        }

        const hasStoraged = CacheServices.storageData(key, value);
        return hasStoraged;
    },
    retrieveDatFromCache: (key: string): unknown | undefined => {
        let data = undefined;
        const hasCachedData = CacheServices.checkCachedData(key);
        if (hasCachedData) {
            data = CacheServices.getData(key);
        }
        return data;
    },
} as CacheServiceInterface;

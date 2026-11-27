import { EpisodeRating, TVShow, TVShowDetailed } from '@tv-app-packages/shared-types';
import { tmdbAPI } from '@apis';
import { tvshowMapper, tvshowDetailedMapper } from '@entityMappers/tmdb/tvshow.entity.mapper';
import { default as CacheServices } from './cache.services';

export interface TVShowServiceInterface {
    search: (criteria: string) => Promise<{ page: number; results: TVShow[] }>;
    searchById: (id: number | string) => Promise<TVShowDetailed>;
    getEpisodeRatings: (id: number, seasonNumber: number) => Promise<EpisodeRating[]>;
    getTrendingTVShows: (timeWindow: TMDB.TimeWindow, language?: string) => Promise<{ page: number; results: TVShow[] }>;
}

const { services: tmdbAPIServices } = tmdbAPI;

export default {
    search: async (criteria: string): Promise<{ page: number; results: TVShow[] }> => {
        const key = CacheServices.generateKey(['tv-show', 'search', `criteria:${criteria}`]);
        const data = CacheServices.retrieveDatFromCache(key);

        if (data) return data as Promise<{ page: number; results: TVShow[] }>;

        try {
            const { page, results } = await tmdbAPIServices.TVShowServices.search(criteria);
            const tvshows = results.map((tvshow) => tvshowMapper(tvshow));

            CacheServices.performCacheStorage(key, { page, results: tvshows });

            return {
                page,
                results: tvshows,
            };
        } catch (error) {
            console.error('[TV APP][TV][ERROR] ::: search', error);
            throw error;
        }
    },
    searchById: async (id: number | string): Promise<TVShowDetailed> => {
        const key = CacheServices.generateKey(['tv-show', 'searchById', `id:${String(id)}`]);
        const data = CacheServices.retrieveDatFromCache(key);

        if (data) return data as Promise<TVShowDetailed>;

        try {
            const result = await tmdbAPIServices.TVShowServices.searchById(id);
            const tvshow = tvshowDetailedMapper(result);

            CacheServices.performCacheStorage(key, tvshow);

            return tvshow;
        } catch (error) {
            console.error('[TV APP][TV][ERROR] ::: searchById', error);
            throw error;
        }
    },
    getEpisodeRatings: async (id: number, seasonNumber: number): Promise<EpisodeRating[]> => {
        const key = CacheServices.generateKey(['tv-show', 'episode-ratings', `id:${id}`, `season:${seasonNumber}`]);
        const cached = CacheServices.retrieveDatFromCache(key) as EpisodeRating[] | undefined;
        if (cached !== undefined) return cached;

        const ratings = await tmdbAPIServices.TVShowServices.getEpisodeRatings(id, seasonNumber);
        CacheServices.performCacheStorage(key, ratings);
        return ratings;
    },
    getTrendingTVShows: async (timeWindow: TMDB.TimeWindow, language?: string): Promise<{ page: number; results: TVShow[] }> => {
        const key = CacheServices.generateKey(['tv-show', 'getTrendingTVShows', `timeWindow:${timeWindow}`, `language:${language || 'default'}`]);
        const data = CacheServices.retrieveDatFromCache(key);

        if (data) return data as Promise<{ page: number; results: TVShow[] }>;

        try {
            const { page, results } = await tmdbAPIServices.TrendingServices.getTrendingTVShows(timeWindow, language);
            const tvshows = results.map((tvshow) => tvshowMapper(tvshow));

            CacheServices.performCacheStorage(key, { page, results: tvshows });

            return {
                page,
                results: tvshows,
            };
        } catch (error) {
            console.error('[TV APP][TV][ERROR] ::: getTrendingTVShows', error);
            throw error;
        }
    },
} as TVShowServiceInterface;

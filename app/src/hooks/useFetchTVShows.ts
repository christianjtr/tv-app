import { useState, useEffect } from 'react';
import { TimeWindow, TVShow, TVShowDetailed } from '@tv-app-packages/shared-types';
import * as TVShowServices from '@services/apis/tv-app/tvshow.api.services';

const useFetchTrendingTVShows = (timeWindow: TimeWindow = 'day', language?: string) => {
    const [tvShows, setTVShows] = useState<TVShow[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const { results } = await TVShowServices.getTrendingTVShows(timeWindow, language);
                setTVShows(results);
            } catch (error) {
                throw new Error(`Error fetching trending tv shows, [Error]: ${error}`);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return {
        tvShows,
        isLoading,
        hasTVShows: tvShows.length > 0,
    };
};

const useSearchTVShows = (criteria: string) => {
    const [tvShows, setTVShows] = useState<TVShow[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const hasQueryCriteria = typeof criteria === 'string' && criteria.length > 0;

        if (hasQueryCriteria) {
            (async () => {
                try {
                    setIsLoading(true);
                    const { results } = await TVShowServices.searchTVShow(criteria);
                    setTVShows(results);
                } catch (error) {
                    throw new Error(`Error fetching trending movies, [Error]: ${error}`);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [criteria]);

    return {
        tvShows,
        isLoading,
        hasTVShows: tvShows.length > 0,
    };
};

const useSearchTVShowById = (id: number | string) => {
    const [tvshow, setTVShow] = useState<TVShowDetailed | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    setIsLoading(true);
                    const result = await TVShowServices.searchTVShowById(id);
                    setTVShow(result);
                } catch (error) {
                    throw new Error(`Error fetching TV show, [Error]: ${error}`);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [id]);

    return {
        tvshow,
        isLoading,
    };
};

export { useFetchTrendingTVShows, useSearchTVShows, useSearchTVShowById };

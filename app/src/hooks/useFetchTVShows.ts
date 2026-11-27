import { useState, useEffect } from 'react';
import { TimeWindow, TVShow } from '@tv-app-packages/shared-types';
import * as TVShowServices from '@services/apis/tv-app/tvshow.api.services';

const useFetchTrendingTVShows = (timeWindow: TimeWindow = 'day', language?: string) => {
    const [tvShows, setTVShows] = useState<TVShow[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                setHasError(false);
                const { results } = await TVShowServices.getTrendingTVShows(timeWindow, language);
                setTVShows(results);
            } catch {
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [language, timeWindow]);

    return {
        tvShows,
        isLoading,
        hasTVShows: tvShows.length > 0,
        hasError,
    };
};

const useSearchTVShows = (criteria: string) => {
    const [tvShows, setTVShows] = useState<TVShow[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let isCurrentRequest = true;
        const hasQueryCriteria = typeof criteria === 'string' && criteria.trim().length > 0;

        if (hasQueryCriteria) {
            setTVShows([]);
            setHasError(false);
            setIsLoading(true);
            (async () => {
                try {
                    const { results } = await TVShowServices.searchTVShow(criteria);
                    if (isCurrentRequest) setTVShows(results);
                } catch {
                    if (isCurrentRequest) setHasError(true);
                } finally {
                    if (isCurrentRequest) setIsLoading(false);
                }
            })();
        } else {
            setTVShows([]);
            setHasError(false);
            setIsLoading(false);
        }

        return () => {
            isCurrentRequest = false;
        };
    }, [criteria]);

    return {
        tvShows,
        isLoading,
        hasTVShows: tvShows.length > 0,
        hasError,
    };
};

export { useFetchTrendingTVShows, useSearchTVShows };

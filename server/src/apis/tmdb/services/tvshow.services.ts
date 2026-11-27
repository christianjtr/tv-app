import qs from 'qs';
import Joi from 'joi';
import { EpisodeRating } from '@tv-app-packages/shared-types';
import HTTPClient, { UpstreamError } from '../httpClient';
import { TVShow } from '../types/TVShow';
import { TVShowDetailed } from '../types/TVShowDetailed';

export interface TVShowServiceInterface {
    search: (criteria: string) => Promise<{ page: number; results: TVShow[] }>;
    searchById: (id: number | string) => Promise<TVShowDetailed>;
    getEpisodeRatings: (id: number, seasonNumber: number) => Promise<EpisodeRating[]>;
}

type TMDBEpisodeRating = {
    episode_number: number;
    name?: string;
    air_date?: string | null;
    vote_average: number;
    vote_count: number;
};

const seasonRatingsSchema = Joi.object({
    episodes: Joi.array()
        .items(
            Joi.object({
                episode_number: Joi.number().integer().min(1).required(),
                name: Joi.string().allow(''),
                air_date: Joi.string()
                    .pattern(/^\d{4}-\d{2}-\d{2}$/)
                    .allow(null, ''),
                vote_average: Joi.number().min(0).max(10).required(),
                vote_count: Joi.number().integer().min(0).required(),
            }).unknown(true)
        )
        .unique('episode_number')
        .required(),
}).unknown(true);

export default {
    search: async (criteria: string): Promise<{ page: number; results: TVShow[] }> => {
        try {
            const queryString = qs.stringify({ query: criteria }, { format: 'RFC1738' });
            const results = await HTTPClient.get<{ page: number; results: TVShow[] }>(`/search/tv?${queryString}`);
            return results;
        } catch (error) {
            console.error('[TMDB API][TV SHOW][ERROR] ::: search', error);
            throw error;
        }
    },
    searchById: async (id: number | string): Promise<TVShowDetailed> => {
        try {
            const result = await HTTPClient.get<TVShowDetailed>(`/tv/${id}`);
            return result;
        } catch (error) {
            console.error('[TMDB API][TV SHOW][ERROR] ::: searchById', error);
            throw error;
        }
    },
    getEpisodeRatings: async (id: number, seasonNumber: number): Promise<EpisodeRating[]> => {
        const result = await HTTPClient.get<unknown>(`/tv/${id}/season/${seasonNumber}`);
        const { error, value } = seasonRatingsSchema.validate(result, { convert: false });
        if (error || !value) throw new UpstreamError();

        const { episodes } = value as { episodes: TMDBEpisodeRating[] };
        return episodes.map((episode) => ({
            episodeNumber: episode.episode_number,
            name: episode.name?.trim() || `Episode ${episode.episode_number}`,
            airDate: episode.air_date || null,
            rating: episode.vote_count > 0 ? episode.vote_average : null,
        }));
    },
} as TVShowServiceInterface;

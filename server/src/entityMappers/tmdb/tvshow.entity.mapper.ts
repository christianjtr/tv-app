import { tmdbAPI } from '@apis';
import { TVShowDetailed, TVShow } from '@tv-app-packages/shared-types';

const {
    config: { TMBD_SECURE_BASE_URL_IMAGE },
} = tmdbAPI;

const baseImgURL = TMBD_SECURE_BASE_URL_IMAGE;

// NICE_TO_HAVE...
// To have a placeholder image hosted...
// i.e: https://placehold.co/{size}

export const tvshowMapper = (source: TMDB.TVShow): TVShow => {
    const { id, name, overview, first_air_date, vote_average, backdrop_path, poster_path } = source;

    return {
        id,
        name,
        description: overview,
        firstAirDate: new Date(first_air_date),
        rating: vote_average,
        images: {
            original: `${baseImgURL}/original${backdrop_path}`,
            w185: poster_path ? `${baseImgURL}/w185${poster_path}` : 'https://placehold.co/185',
            w300: poster_path ? `${baseImgURL}/w300${poster_path}` : 'https://placehold.co/300',
            w500: poster_path ? `${baseImgURL}/w500${poster_path}` : 'https://placehold.co/500',
        },
    };
};

export const tvshowDetailedMapper = (source: TMDB.TVShowDetailed): TVShowDetailed => {
    const {
        id,
        name,
        overview,
        first_air_date,
        vote_average,
        backdrop_path,
        poster_path,
        homepage,
        original_language,
        tagline,
        genres,
        in_production,
        number_of_episodes,
        number_of_seasons,
        seasons,
        episode_run_time,
    } = source;

    return {
        id,
        name,
        description: overview,
        firstAirDate: new Date(first_air_date),
        rating: vote_average,
        images: {
            original: `${baseImgURL}/original${backdrop_path}`,
            w185: poster_path ? `${baseImgURL}/w185${poster_path}` : 'https://placehold.co/185',
            w300: poster_path ? `${baseImgURL}/w300${poster_path}` : 'https://placehold.co/300',
            w500: poster_path ? `${baseImgURL}/w500${poster_path}` : 'https://placehold.co/500',
        },
        genres,
        seasons: seasons.map((season) => ({
            firstAirDate: season.air_date,
            numberOfEpisodes: season.episode_count,
            id: season.id,
            name: season.name,
            description: season.overview,
            seasonNumber: season.season_number,
            rating: season.vote_average,
            images: {
                original: `${baseImgURL}/original${backdrop_path}`,
                w185: poster_path ? `${baseImgURL}/w185${poster_path}` : 'https://placehold.co/185',
                w300: poster_path ? `${baseImgURL}/w300${poster_path}` : 'https://placehold.co/300',
                w500: poster_path ? `${baseImgURL}/w500${poster_path}` : 'https://placehold.co/500',
            },
        })),
        tagline,
        inProduction: in_production,
        homepage: homepage,
        originalLanguage: original_language,
        numberOfEpisodes: number_of_episodes,
        numberOfSeasons: number_of_seasons,
        episodeRuntime: episode_run_time,
    };
};

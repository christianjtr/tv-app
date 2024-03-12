import { tmdbAPI } from '@apis';
import { MovieDetailed, Movie } from '@tv-app-packages/shared-types';

const {
    config: { TMBD_SECURE_BASE_URL_IMAGE },
} = tmdbAPI;

const baseImgURL = TMBD_SECURE_BASE_URL_IMAGE;

// NICE_TO_HAVE...
// To have a placeholder image hosted...
// i.e: https://placehold.co/{size}

export const movieMapper = (source: TMDB.Movie): Movie => {
    const { id, title, overview, release_date, vote_average, backdrop_path, poster_path } = source;

    return {
        id,
        title,
        description: overview,
        releaseDate: new Date(release_date),
        rating: vote_average,
        images: {
            original: `${baseImgURL}/original${backdrop_path}`,
            w185: poster_path ? `${baseImgURL}/w185${poster_path}` : 'https://placehold.co/185',
            w300: poster_path ? `${baseImgURL}/w300${poster_path}` : 'https://placehold.co/300',
            w500: poster_path ? `${baseImgURL}/w500${poster_path}` : 'https://placehold.co/500',
        },
    };
};

export const movieDetailedMapper = (source: TMDB.MovieDetailed): MovieDetailed => {
    const {
        id,
        title,
        overview,
        release_date,
        vote_average,
        backdrop_path,
        poster_path,
        imdb_id,
        tagline,
        genres,
        homepage,
        runtime,
        original_language,
    } = source;

    return {
        id,
        title,
        description: overview,
        releaseDate: new Date(release_date),
        rating: vote_average,
        images: {
            original: `${baseImgURL}/original${backdrop_path}`,
            w185: poster_path ? `${baseImgURL}/w185${poster_path}` : 'https://placehold.co/185',
            w300: poster_path ? `${baseImgURL}/w300${poster_path}` : 'https://placehold.co/300',
            w500: poster_path ? `${baseImgURL}/w500${poster_path}` : 'https://placehold.co/500',
        },
        runtime,
        genres,
        IMDBId: imdb_id,
        tagLine: tagline,
        homepage: homepage,
        originalLanguage: original_language,
    };
};

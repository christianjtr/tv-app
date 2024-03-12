import { TMDB_API_CONFIGURATION } from './configuration';
import { default as MovieServices, MovieServiceInterface } from './services/movie.services';
import { default as TVShowServices, TVShowServiceInterface } from './services/tvshow.services';
import { default as TrendingServices, TrendingServiceInterface } from './services/trending.services';

export interface tmdbApiInterface {
    config: Record<PropertyKey, unknown>;
    services: {
        MovieServices: MovieServiceInterface;
        TVShowServices: TVShowServiceInterface;
        TrendingServices: TrendingServiceInterface;
    };
}

export default {
    config: { ...TMDB_API_CONFIGURATION },
    services: {
        MovieServices,
        TVShowServices,
        TrendingServices,
    },
} as tmdbApiInterface;

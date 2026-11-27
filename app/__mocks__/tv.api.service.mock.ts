import movieMock from '../__fixtures__/movie.json';
import moviesMock from '../__fixtures__/movies.json';
import tvshowMock from '../__fixtures__/tvshow.json';
import tvshowsMock from '../__fixtures__/tvshows.json';
import episodeRatings from '../__fixtures__/episodeRatings.json';
import type { EpisodeRating } from '@tv-app-packages/shared-types';

const episodeRatingsMock: Record<number, EpisodeRating[]> = episodeRatings;

export default {
    movieMock,
    moviesMock,
    tvshowMock,
    tvshowsMock,
    episodeRatingsMock,
};

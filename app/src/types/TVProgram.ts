import { Movie, TVShow, MovieDetailed, TVShowDetailed } from '@tv-app-packages/shared-types';

export type AllowedTVProgramResource = 'movies' | 'tv-shows';

export const TVProgramOptions = ['movie', 'tv-show'] as const;
export type TVProgramType = (typeof TVProgramOptions)[number];
export type TVProgram = Partial<Movie> & Partial<TVShow>;
export type TVProgramDetailed = Partial<MovieDetailed> & Partial<TVShowDetailed>;

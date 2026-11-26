import { TVProgramDetailed, AllowedTVProgramResource } from '@app-types/TVProgram';
import { searchMovieById } from './movie.api.services';
import { searchTVShowById } from './tvshow.api.services';

export const getTVProgramById = async (id: number | string, tvProgramResourceType: AllowedTVProgramResource): Promise<TVProgramDetailed> => {
    const servicesByTVProgram: Record<AllowedTVProgramResource, (id: number | string) => Promise<TVProgramDetailed>> = {
        movies: searchMovieById,
        'tv-shows': searchTVShowById,
    };
    return servicesByTVProgram[tvProgramResourceType](id);
};

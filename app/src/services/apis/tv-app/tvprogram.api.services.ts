import { TVProgramDetailed, AllowedTVProgramResource } from '@app-types/TVProgram';
import { searchMovieById } from './movie.api.services';
import { searchTVShowById } from './tvshow.api.services';

export const getTVProgramById = async (id: number | string, tvProgramResourceType: AllowedTVProgramResource): Promise<TVProgramDetailed> => {
    try {
        const servicesByTVProgram: Record<AllowedTVProgramResource, (id: number | string) => Promise<TVProgramDetailed>> = {
            movies: searchMovieById,
            'tv-shows': searchTVShowById,
        };
        const result = await servicesByTVProgram[tvProgramResourceType](id);
        return result;
    } catch (error) {
        throw new Error(error as string | undefined);
    }
};

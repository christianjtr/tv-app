import { Movie } from './Movie';
import { TVShow } from './TVShow';
import { TimeWindow } from './TimeWindow';
import { MovieDetailed } from './MovieDetailed';
import { TVShowDetailed } from './TVShowDetailed';

declare global {
    namespace TMDB {
        export { Movie, TVShow, TimeWindow, MovieDetailed, TVShowDetailed };
    }
}

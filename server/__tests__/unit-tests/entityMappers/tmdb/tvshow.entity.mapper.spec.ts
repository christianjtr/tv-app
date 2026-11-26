import tvShowDetailed from '../../../../__fixtures__/tvShowDetailed.json';
import { tvshowDetailedMapper } from '../../../../src/entityMappers/tmdb/tvshow.entity.mapper';
import { TVShowDetailed as TMDBTVShowDetailed } from '../../../../src/apis/tmdb/types/TVShowDetailed';

describe('tvshowDetailedMapper', () => {
    it('uses each season’s own poster', () => {
        const mapped = tvshowDetailedMapper(tvShowDetailed as unknown as TMDBTVShowDetailed);
        const season = tvShowDetailed.seasons[0];

        expect(mapped.seasons[0].images.w300).toBe(`https://example.org/w300${season.poster_path}`);
        expect(mapped.seasons[0].images.w300).not.toBe(mapped.images.w300);
    });
});

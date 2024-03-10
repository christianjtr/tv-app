export type TVShow = {
    id: number;
    name: string;
    description: string;
    firstAirDate: Date;
    rating: number;
    images: {
        original: string;
        w185: string;
        w300: string;
        w500: string;
    };
};

export type TVShowDetailed = TVShow & {
    inProduction: boolean;
    numberOfEpisodes: number;
    numberOfSeasons: number;
    genres: { id: number; name: string }[];
    seasons: {
        air_date: string;
        episode_count: number;
        id: number;
        name: string;
        overview: string;
        poster_path: string;
        season_number: number;
        vote_average: number;
    }[];
    tagline: string;
    homepage: string;
    episodeRuntime: number[];
    originalLanguage: string;
};

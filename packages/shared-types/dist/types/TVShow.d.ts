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
    genres: {
        id: number;
        name: string;
    }[];
    seasons: {
        firstAirDate: string;
        numberOfEpisodes: number;
        id: number;
        name: string;
        description: string;
        seasonNumber: number;
        rating: number;
        images: {
            original: string;
            w185: string;
            w300: string;
            w500: string;
        };
    }[];
    tagline: string;
    homepage: string;
    episodeRuntime: number[];
    originalLanguage: string;
};

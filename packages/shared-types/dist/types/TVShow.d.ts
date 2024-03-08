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

export type Movie = {
    id: number;
    title: string;
    description: string;
    releaseDate: Date;
    rating: number;
    images: {
        original: string;
        w185: string;
        w300: string;
        w500: string;
    };
};

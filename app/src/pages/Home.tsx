import React from 'react';
import TVProgramRail from '@components/TVProgramRail';
import { SliderImage } from '@layout';
import { useFetchTrendingMovies } from '@hooks/useFetchMovies';
import { useFetchTrendingTVShows } from '@hooks/useFetchTVShows';
import { TVProgram, TVProgramType } from '@app-types/TVProgram';
import './Home.css';

export type TVProgramRail = {
    title: string;
    source: TVProgram[];
    isLoading: boolean;
    hasError: boolean;
    tvProgramType: TVProgramType;
};

const Home: React.FC = (): React.ReactElement => {
    const { movies, isLoading: isLoadingMovies, hasError: hasMoviesError } = useFetchTrendingMovies();
    const { tvShows, isLoading: isLoadingTVShows, hasError: hasTVShowsError } = useFetchTrendingTVShows();

    const tvProgramRails: TVProgramRail[] = [
        { title: 'Trending movies', source: movies, isLoading: isLoadingMovies, hasError: hasMoviesError, tvProgramType: 'movie' },
        { title: 'Trending TV shows', source: tvShows, isLoading: isLoadingTVShows, hasError: hasTVShowsError, tvProgramType: 'tv-show' },
    ];

    const images = tvProgramRails.reduce((acc: { source: string; title: string }[], obj: TVProgramRail) => {
        return [
            ...acc,
            ...obj.source.map((property) => {
                return {
                    source: property.images?.original,
                    title: property?.title || property?.name,
                };
            }),
        ].filter((obj) => !!obj.source && !!obj.title) as { source: string; title: string }[];
    }, []);

    return (
        <div className="home-page flex w-full flex-col">
            <SliderImage imageSources={images} />
            <div className="home-page__catalog">
                <h1 className="home-page__heading">Popular right now</h1>
                {tvProgramRails.map(({ title, source, isLoading, hasError, tvProgramType }, index) => (
                    <TVProgramRail
                        title={title}
                        tvPrograms={source}
                        isLoading={isLoading}
                        hasError={hasError}
                        key={`tv-program-rail_${index}`}
                        tvProgramType={tvProgramType}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;

import React from 'react';
import TVProgramRail from '@components/TVProgramRail';
import { SliderImage } from '@layout';
import { useFetchTrendingMovies } from '@hooks/useFetchMovies';
import { useFetchTrendingTVShows } from '@hooks/useFetchTVShows';
import { TVProgram, TVProgramType } from '@app-types/TVProgram';

export type TVProgramRail = {
    title: string;
    source: TVProgram[];
    isLoading: boolean;
    tvProgramType: TVProgramType;
};

const Home: React.FC = (): React.ReactElement => {
    const { movies, isLoading: isLoadingMovies } = useFetchTrendingMovies();
    const { tvShows, isLoading: isLoadingTVShows } = useFetchTrendingTVShows();

    const tvProgramRails: TVProgramRail[] = [
        { title: 'Movies', source: movies, isLoading: isLoadingMovies, tvProgramType: 'movie' },
        { title: 'TV Shows', source: tvShows, isLoading: isLoadingTVShows, tvProgramType: 'tv-show' },
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
        <div className="flex flex-col w-full">
            <SliderImage imageSources={images} hasOverlay />
            <div className="relative -top-16">
                <h1 className="text-2xl text-left mb-5">
                    🍿 Top picks to watch<span className="text-5xl text-pink-400">.</span>
                </h1>
                {tvProgramRails.map(({ title, source, isLoading, tvProgramType }, index) => (
                    <TVProgramRail
                        title={title}
                        tvPrograms={source}
                        isLoading={isLoading}
                        key={`tv-program-rail_${index}`}
                        tvProgramType={tvProgramType}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;

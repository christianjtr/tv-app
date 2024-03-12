import React from 'react';
import TVProgramRail from '@components/TVProgramRail';
import { useFetchTrendingMovies } from '@hooks/useFetchMovies';
import { useFetchTrendingTVShows } from '@hooks/useFetchTVShows';
import { TVProgram, TVProgramType } from '@app-types/TVProgram';

const Home: React.FC = (): React.ReactElement => {
    const { movies, isLoading: isLoadingMovies } = useFetchTrendingMovies();
    const { tvShows, isLoading: isLoadingTVShows } = useFetchTrendingTVShows();

    const tvProgramRails: { title: string; source: TVProgram[]; isLoading: boolean; tvProgramType: TVProgramType }[] = [
        { title: 'Movies', source: movies, isLoading: isLoadingMovies, tvProgramType: 'movie' },
        { title: 'TV Shows', source: tvShows, isLoading: isLoadingTVShows, tvProgramType: 'tv-show' },
    ];

    return (
        <div className="flex flex-col w-full">
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
    );
};

export default Home;

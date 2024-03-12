import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SearchProgramForm from '@components/SearchProgramForm';
import TVProgramItem from '@components/TVProgamItem/TVProgramItem';
import NotFound from './NotFound';
import { Loading } from '@layout';
import { useSearchMovies } from '@hooks/useFetchMovies';
import { useSearchTVShows } from '@hooks/useFetchTVShows';
import { useSearchQueryParams } from '@hooks/useSearchQueryParams';
import { TVProgram, TVProgramType } from '@app-types/TVProgram';

const Search: React.FC = (): React.ReactElement => {
    const history = useHistory();
    const [searchCriteria, setSearchCriteria] = useState<string>('');

    const { movies, isLoading: isLoadingMovies } = useSearchMovies(searchCriteria);
    const { tvShows, isLoading: isLoadingTVShows } = useSearchTVShows(searchCriteria);
    const { getQueryParamValues, setQueryParams } = useSearchQueryParams();

    const results: (TVProgram & { tvProgramType: TVProgramType })[] = [
        ...movies.map((movie) => ({ ...movie, tvProgramType: 'movie' as TVProgramType })),
        ...tvShows.map((tvshow) => ({ ...tvshow, tvProgramType: 'tv-show' as TVProgramType })),
    ];
    const isLoading = isLoadingMovies || isLoadingTVShows;

    const detailPath: Record<TVProgramType, string> = {
        movie: 'movies',
        'tv-show': 'tv-shows',
    };

    const handleOnSearch = (criteria: string): void => {
        setSearchCriteria(criteria);
        setQueryParams('/search', { query: criteria });
    };

    useEffect(() => {
        const { query } = getQueryParamValues(['query']);
        if (query) setSearchCriteria(query as string);
    }, []);

    return (
        <div className="flex flex-col w-full">
            <h1 className="text-2xl text-left">
                🔎 What you are looking for?<span className="text-5xl text-pink-400">.</span>
            </h1>
            <SearchProgramForm onSearch={handleOnSearch} isLoading={isLoading} autoFocus />
            <h2 className="divider divider-start text-lg">
                Search results for: <span className="text-white font-semibold">{searchCriteria || '-- Movie or TV Show --'}</span>
            </h2>
            <div className="hero h-full flex flex-col mt-10">
                {isLoading && <Loading />}
                {results.length === 0 && <NotFound title="Please, try searching for something" />}
                <div className="grid md:grid-cols-5 gap-5 mb-10 sm:grid-cols-3 xs:grid-cols-2">
                    {results.map(({ id, tvProgramType, ...item }, index) => (
                        <TVProgramItem info={item} key={`program_${index}`} onClick={() => history.push(`/${detailPath[tvProgramType]}/${id}`)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchProgramForm from '@components/SearchProgramForm';
import TVProgramItem from '@components/TVProgamItem/TVProgramItem';
import { useSearchMovies } from '@hooks/useFetchMovies';
import { useSearchTVShows } from '@hooks/useFetchTVShows';
import { useSearchQueryParams } from '@hooks/useSearchQueryParams';
import { TVProgram, TVProgramType } from '@app-types/TVProgram';
import './Search.css';

const Search: React.FC = (): React.ReactElement => {
    const navigate = useNavigate();
    const { query: searchCriteria, setQueryParams } = useSearchQueryParams();

    const { movies, isLoading: isLoadingMovies, hasError: hasMoviesError } = useSearchMovies(searchCriteria);
    const { tvShows, isLoading: isLoadingTVShows, hasError: hasTVShowsError } = useSearchTVShows(searchCriteria);

    const results: (TVProgram & { tvProgramType: TVProgramType })[] = [
        ...movies.map((movie) => ({ ...movie, tvProgramType: 'movie' as TVProgramType })),
        ...tvShows.map((tvshow) => ({ ...tvshow, tvProgramType: 'tv-show' as TVProgramType })),
    ];
    const isLoading = isLoadingMovies || isLoadingTVShows;
    const hasError = hasMoviesError || hasTVShowsError;
    const hasQuery = searchCriteria.trim().length > 0;

    const detailPath: Record<TVProgramType, string> = {
        movie: 'movies',
        'tv-show': 'tv-shows',
    };

    const handleOnSearch = (criteria: string): void => {
        setQueryParams('/search', { query: criteria });
    };

    return (
        <div className="search-page">
            <div className="search-page__intro">
                <h1>Search</h1>
                <p>Find movies and TV shows by title.</p>
            </div>
            <SearchProgramForm onSearch={handleOnSearch} isLoading={isLoading} />
            <section className="search-results" aria-labelledby="search-results-heading">
                <div className="search-results__header">
                    <div>
                        <h2 id="search-results-heading">{hasQuery ? `Results for “${searchCriteria}”` : 'Search results'}</h2>
                        {hasQuery && <p>Movies and TV shows</p>}
                    </div>
                    {hasQuery && !isLoading && !hasError && (
                        <span className="search-results__count">
                            {results.length} {results.length === 1 ? 'title' : 'titles'}
                        </span>
                    )}
                </div>
                {isLoading && (
                    <div className="search-state" data-cy="loading" role="status">
                        <span className="loading loading-spinner" aria-hidden="true"></span>
                        <span>Searching the catalog…</span>
                    </div>
                )}
                {hasError && (
                    <p className="search-state search-state--error" role="alert">
                        Some search results could not be loaded. Reload the page to try again.
                    </p>
                )}
                {!isLoading && !hasError && results.length === 0 && (
                    <div className="search-state search-state--empty">
                        <h3>{hasQuery ? 'No matches found' : 'Start with a search'}</h3>
                        <p>{hasQuery ? 'Try another title or spelling.' : 'Enter a movie or TV show title above.'}</p>
                    </div>
                )}
                {results.length > 0 && (
                    <div className="search-results__grid">
                        {results.map(({ id, tvProgramType, ...item }, index) => (
                            <TVProgramItem info={item} key={`program_${index}`} onClick={() => navigate(`/${detailPath[tvProgramType]}/${id}`)} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Search;

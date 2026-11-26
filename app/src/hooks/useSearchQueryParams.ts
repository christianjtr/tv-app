import { useLocation, useNavigate, matchPath } from 'react-router-dom';
import { stringify } from 'qs';

const useSearchQueryParams = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const query = searchParams.get('query') ?? '';

    const setQueryParams = (pathname: string, params: Record<PropertyKey, unknown>): void => {
        navigate({
            pathname,
            search: `?${stringify({ ...params })}`,
        });
    };

    return {
        query,
        setQueryParams,
    };
};

const useBasePathCheckerForDetailedPage = (pathname: string): string | undefined => {
    if (matchPath('/movies/:id', pathname)) return 'movies';
    if (matchPath('/tv-shows/:id', pathname)) return 'tv-shows';
};

export { useSearchQueryParams, useBasePathCheckerForDetailedPage };

import { useHistory, useLocation, matchPath } from 'react-router-dom';
import { stringify } from 'qs';

const useSearchQueryParams = () => {
    const history = useHistory();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);

    const getQueryParamValues = (params: string[]): Record<PropertyKey, unknown> => {
        const values = params.reduce((acc, item) => {
            return {
                [item]: searchParams.get(item),
                ...acc,
            };
        }, {});

        return values;
    };

    const setQueryParams = (pathname: string, params: Record<PropertyKey, unknown>): void => {
        history.push({
            pathname,
            search: `?${stringify({ ...params })}`,
        });
    };

    return {
        getQueryParamValues,
        setQueryParams,
    };
};

const useBasePathCheckerForDetailedPage = (pathname: string): string | undefined => {
    const allowedPaths = ['/movies/:id', '/tv-shows/:id'];

    const match = matchPath(pathname, {
        path: allowedPaths,
        exact: true,
        strict: false,
    });

    if (match?.isExact) {
        const [, basePath] = match.path.split('/');
        return basePath;
    }

    return undefined;
};

export { useSearchQueryParams, useBasePathCheckerForDetailedPage };

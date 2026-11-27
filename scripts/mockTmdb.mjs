import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';

const fixture = (name) => JSON.parse(readFileSync(new URL(`../server/__fixtures__/${name}`, import.meta.url), 'utf8'));
const movies = fixture('trendingMovies.json');
const tvShows = fixture('trendingTVShows.json');
const movieDetailed = fixture('movieDetailed.json');
const tvShowDetailed = fixture('tvShowDetailed.json');

const server = createServer((request, response) => {
    const { pathname, searchParams } = new URL(request.url ?? '/', 'http://localhost');
    const send = (status, body) => {
        response.writeHead(status, { 'content-type': 'application/json' });
        response.end(JSON.stringify(body));
    };

    if (pathname === '/health') return send(200, { ok: true });
    if (pathname === '/3/trending/movie/day') return send(200, movies);
    if (pathname === '/3/trending/tv/day') return send(200, tvShows);
    if (pathname === '/3/search/movie') {
        if (searchParams.get('query') === '__API_ERROR__') return send(503, { status_message: 'Unavailable' });
        return send(200, { page: 1, results: [], total_pages: 1, total_results: 0 });
    }

    if (pathname === '/3/search/tv') {
        const query = searchParams.get('query');
        if (query === '__API_ERROR__') return send(503, { status_message: 'Unavailable' });
        const results = query === '__SOME__TV__PROGRAM__' ? [tvShowDetailed] : [];
        return send(200, { page: 1, results, total_pages: 1, total_results: results.length });
    }

    if (pathname === '/3/movie/999999' || pathname === '/3/tv/999999') return send(503, { status_message: 'Unavailable' });
    if (/^\/3\/movie\/\d+$/.test(pathname)) return send(200, movieDetailed);
    if (/^\/3\/tv\/\d+$/.test(pathname)) return send(200, tvShowDetailed);

    return send(404, { status_message: 'Not found' });
});

server.listen(Number(process.env.TMDB_STUB_PORT ?? 4000), '127.0.0.1');

import { createElement, useEffect, useMemo, useState } from 'react';
import type { EpisodeRating, TVShowDetailed } from '@tv-app-packages/shared-types';
import { getEpisodeRatings } from '@services/apis/tv-app/tvshow.api.services';
import SeasonCard from '@components/SeasonCard';
import './EpisodeRatingGrid.css';

type Season = TVShowDetailed['seasons'][number];
type SeasonRatings = Map<number, EpisodeRating> | 'unavailable';

const ratingBands = [
    { min: 9, label: '9–10' },
    { min: 8, label: '8–8.9' },
    { min: 6, label: '6–7.9' },
    { min: 0, label: '0–5.9' },
];

function episodeCell(episode: EpisodeRating | undefined, result: SeasonRatings | undefined, expectedEpisode: boolean, today: string) {
    if (result === undefined) return <span className="episode-ratings__state">Cargando</span>;
    if (result === 'unavailable') return <span className="episode-ratings__state">No disponible</span>;
    if (!episode && expectedEpisode) return <span className="episode-ratings__state">Sin nota</span>;
    if (!episode) return <span className="episode-ratings__gap">—</span>;
    if (episode.airDate && episode.airDate > today) return <span className="episode-ratings__chip">Upcoming</span>;
    if (episode.rating === null) return <span className="episode-ratings__chip">No votes</span>;

    const score = episode.rating.toFixed(1);
    const band = ratingBands.find(({ min }) => Number(score) >= min);
    return (
        <span className="episode-ratings__chip episode-ratings__score" data-band={band?.min}>
            {score}
        </span>
    );
}

function episodeDate(value: string): string {
    return new Date(`${value}T00:00:00Z`).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
    });
}

function EpisodeGrid({ showId, season }: { showId: number; season: Season }) {
    const [ratings, setRatings] = useState<SeasonRatings>();

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;
        setRatings(undefined);

        // Wait for effect cleanup before sending requests during Strict Mode's development replay.
        queueMicrotask(async () => {
            if (signal.aborted) return;
            try {
                const episodes = await getEpisodeRatings(showId, season.seasonNumber, signal);
                if (!signal.aborted) setRatings(new Map(episodes.map((episode) => [episode.episodeNumber, episode])));
            } catch {
                if (!signal.aborted) setRatings('unavailable');
            }
        });
        return () => controller.abort();
    }, [showId, season.seasonNumber, setRatings]);

    const episodeCount = Math.max(season.numberOfEpisodes, ratings instanceof Map ? Math.max(0, ...ratings.keys()) : 0);
    const episodeNumbers = Array.from({ length: episodeCount }, (_, index) => index + 1);
    const today = new Date().toISOString().slice(0, 10);
    let status = '';
    if (ratings === undefined) status = `Loading ratings for ${season.name}…`;
    else if (ratings === 'unavailable') status = `Ratings for ${season.name} could not be loaded. Reload to try again.`;
    else if (episodeNumbers.length === 0) status = `No episodes are listed for ${season.name}.`;

    return (
        <>
            <p className="episode-ratings__status" role="status">
                {status}
            </p>
            <ul className="episode-ratings__legend" aria-label="Rating scale">
                {ratingBands.map(({ min, label }) => (
                    <li key={min}>
                        <span className="episode-ratings__swatch" data-band={min} aria-hidden="true" />
                        {label}
                    </li>
                ))}
            </ul>
            <ol className="episode-ratings__grid" aria-label={`Episodes in ${season.name}`}>
                {episodeNumbers.map((episodeNumber) => (
                    <li className="episode-ratings__episode" key={episodeNumber}>
                        <h4 title={ratings instanceof Map ? ratings.get(episodeNumber)?.name : undefined}>
                            {ratings instanceof Map ? ratings.get(episodeNumber)?.name || `Episode ${episodeNumber}` : `Episode ${episodeNumber}`}
                        </h4>
                        {ratings instanceof Map && ratings.get(episodeNumber)?.airDate ? (
                            <time className="episode-ratings__air-date" dateTime={ratings.get(episodeNumber)?.airDate ?? undefined}>
                                {episodeDate(ratings.get(episodeNumber)?.airDate as string)}
                            </time>
                        ) : (
                            <span className="episode-ratings__air-date" aria-hidden="true"></span>
                        )}
                        <div className="episode-ratings__episode-score">
                            {episodeCell(
                                ratings instanceof Map ? ratings.get(episodeNumber) : undefined,
                                ratings,
                                episodeNumber <= season.numberOfEpisodes,
                                today
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </>
    );
}

export default function EpisodeRatingGrid({ showId, seasons }: { showId: number; seasons?: Season[] }) {
    const regularSeasons = useMemo(
        () => seasons?.filter(({ seasonNumber }) => seasonNumber > 0).sort((a, b) => a.seasonNumber - b.seasonNumber) ?? [],
        [seasons]
    );
    const [selectedSeasonNumber, setSelectedSeasonNumber] = useState(() => regularSeasons[0]?.seasonNumber);
    const selectedSeason = regularSeasons.find(({ seasonNumber }) => seasonNumber === selectedSeasonNumber) ?? regularSeasons[0];
    if (!seasons?.length) return null;

    return (
        <section className="season-section episode-ratings" aria-labelledby="episode-ratings-title">
            <div className="episode-ratings__heading">
                <h2 id="episode-ratings-title" className="season-section__title">
                    Episode ratings
                </h2>
                <p>Choose a season to explore its episode titles, original air dates and community scores.</p>
            </div>
            <div className="episode-ratings__layout">
                <aside className="episode-ratings__seasons" aria-labelledby="episode-ratings-seasons-title">
                    <h3 id="episode-ratings-seasons-title">Seasons</h3>
                    {selectedSeason && (
                        <select
                            className="episode-ratings__season-select"
                            aria-labelledby="episode-ratings-seasons-title"
                            value={selectedSeason.seasonNumber}
                            onChange={(event) => setSelectedSeasonNumber(Number(event.currentTarget.value))}
                        >
                            <button>{createElement('selectedcontent')}</button>
                            {regularSeasons.map((season) => (
                                <option key={season.id} value={season.seasonNumber}>
                                    <img src={season.images.w185} alt="" loading="lazy" />
                                    <span className="episode-ratings__option-copy">
                                        <span className="episode-ratings__option-name">{season.name}</span>
                                        <span className="episode-ratings__option-count">{season.numberOfEpisodes} episodes</span>
                                    </span>
                                </option>
                            ))}
                        </select>
                    )}
                    <div className={`episode-ratings__season-list${selectedSeason ? ' episode-ratings__season-list--selectable' : ''}`}>
                        {seasons.map((season) => (
                            <SeasonCard
                                info={season}
                                key={season.id}
                                isSelected={season.seasonNumber === selectedSeason?.seasonNumber}
                                onSelect={season.seasonNumber > 0 ? () => setSelectedSeasonNumber(season.seasonNumber) : undefined}
                            />
                        ))}
                    </div>
                </aside>
                <div className="episode-ratings__comparison">
                    {selectedSeason ? (
                        <>
                            <div className="episode-ratings__comparison-heading">
                                <div>
                                    <h3>{selectedSeason.name}</h3>
                                    <p>
                                        <span className="episode-ratings__episode-count">{selectedSeason.numberOfEpisodes}</span> episodes
                                        <span className="episode-ratings__source">TMDB community scores · out of 10</span>
                                    </p>
                                </div>
                            </div>
                            <EpisodeGrid key={selectedSeason.seasonNumber} showId={showId} season={selectedSeason} />
                        </>
                    ) : (
                        <p>No episode ratings are available for these seasons.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

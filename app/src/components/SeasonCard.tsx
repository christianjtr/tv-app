import React from 'react';
import { TVShowDetailed } from '@tv-app-packages/shared-types';
import formatReleaseDate from '../utils/formatReleaseDate';
import './SeasonCard.css';

export interface SeasonCardProps {
    info: TVShowDetailed['seasons'][number];
    isSelected?: boolean;
    onSelect?: () => void;
}

const SeasonCard: React.FC<SeasonCardProps> = (props: SeasonCardProps) => {
    const { info, isSelected = false, onSelect } = props;
    const formattedReleaseDate = info.firstAirDate ? formatReleaseDate(info.firstAirDate) : null;
    const episodeCount = `${info.numberOfEpisodes} ${info.numberOfEpisodes === 1 ? 'episode' : 'episodes'}`;
    const title = (
        <span className="season-card__title" role="heading" aria-level={3}>
            {info.name}
        </span>
    );
    const content = (
        <>
            <img src={info.images.w300} alt={onSelect ? '' : `${info.name} poster`} className="season-card__poster" loading="lazy" decoding="async" />
            <span className="season-card__body">
                <span className="season-card__heading">
                    {title}
                    {info.rating > 0 && <span className="season-card__rating">{info.rating.toFixed(1)} ★</span>}
                </span>
                <span className="season-card__metadata">
                    {formattedReleaseDate && <time dateTime={info.firstAirDate}>{formattedReleaseDate}</time>}
                    <span>{episodeCount}</span>
                </span>
            </span>
        </>
    );

    return onSelect ? (
        <button
            type="button"
            className={`season-card season-card--selectable${isSelected ? ' season-card--selected' : ''}`}
            aria-pressed={isSelected}
            onClick={onSelect}
        >
            {content}
        </button>
    ) : (
        <article className="season-card" data-element="season-card">
            {content}
        </article>
    );
};

export default SeasonCard;

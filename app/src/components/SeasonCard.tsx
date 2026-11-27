import React from 'react';
import { TVShowDetailed } from '@tv-app-packages/shared-types';
import { Rating } from './TVProgamItem/TVProgramItem';
import formatReleaseDate from '../utils/formatReleaseDate';
import './SeasonCard.css';

export interface SeasonCardProps {
    info: TVShowDetailed['seasons'][number];
}

const SeasonCard: React.FC<SeasonCardProps> = (props: SeasonCardProps) => {
    const { info } = props;
    const formattedReleaseDate = info.firstAirDate ? formatReleaseDate(info.firstAirDate) : null;
    const episodeCount = `${info.numberOfEpisodes} ${info.numberOfEpisodes === 1 ? 'episode' : 'episodes'}`;

    return (
        <article className="season-card" data-element="season-card">
            <img src={info.images.w300} alt={`${info.name} poster`} className="season-card__poster" loading="lazy" decoding="async" />
            <div className="season-card__body">
                <div className="season-card__heading">
                    <h3 className="season-card__title">{info.name}</h3>
                    {info.rating > 0 && <Rating value={info.rating} className="season-card__rating" />}
                </div>
                <div className="season-card__metadata">
                    {formattedReleaseDate && <time dateTime={info.firstAirDate}>{formattedReleaseDate}</time>}
                    <span>{episodeCount}</span>
                </div>
            </div>
        </article>
    );
};

export default SeasonCard;

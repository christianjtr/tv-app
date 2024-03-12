import React from 'react';
import { TVShowDetailed } from '@tv-app-packages/shared-types';
import { Rating } from './TVProgamItem/TVProgramItem';

export interface SeasonCardProps {
    info: TVShowDetailed['seasons'][number];
}

const SeasonCard: React.FC<SeasonCardProps> = (props: SeasonCardProps) => {
    const { info } = props;

    // TODO: Consider extract this to utils...
    const releaseDate = info.firstAirDate;
    const formattedReleaseDate = new Date(releaseDate!).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
        <div className="card bg-base-100 shadow-lg" data-element="season-card" tabIndex={0}>
            <figure>
                <img src={info.images.w185} alt="Season poster" aria-label="Season poster" />
            </figure>
            <div className="card-body text-base sm:flex xs:flex items-center">
                <h3 className="card-title">{info.name}</h3>
                <Rating value={info.rating} />
                <p>
                    <span className="block">{formattedReleaseDate}</span>
                    <span className="block">Season: {info.seasonNumber}</span>
                    <span className="block">Episodes: {info.numberOfEpisodes}</span>
                </p>
            </div>
        </div>
    );
};

export default SeasonCard;

import React from 'react';
import { TVProgram } from '@app-types/TVProgram';
import './TVProgramItem.css';

export interface TVProgramItemProps {
    info: TVProgram;
    onClick: () => void;
    onFocus?: () => void;
}

export interface RatingProps {
    value: number;
    precision?: number;
    className?: string;
}

export const Rating: React.FC<RatingProps> = (props: RatingProps): React.ReactElement => {
    const { value = 0, precision = 1, className = '' } = props;

    const hasDecilmalPlaces = value - Math.floor(value) !== 0;
    const rating = hasDecilmalPlaces ? value.toFixed(precision) : Math.ceil(value);

    return <div className={`badge bg-indigo-700 text-white p-2 ${className}`}>{rating} ★</div>;
};

const TVProgramItem: React.FC<TVProgramItemProps> = (props: TVProgramItemProps): React.ReactElement => {
    const { info, onClick: onClickCallbackFn, onFocus } = props;

    const programTitle = info.title || info.name;

    return (
        <button
            type="button"
            className="tv-program-item"
            onClick={onClickCallbackFn}
            aria-label={`View ${programTitle} details`}
            data-testid={`program_${programTitle}`}
            data-element="tv-program-rail-item"
            data-cy="tv-program-rail-item"
            onFocus={onFocus}
        >
            <img src={info.images?.w185} alt={`${programTitle} poster`} />
            <span className="tv-program-item__info" aria-hidden="true">
                <span className="tv-program-item__title">{programTitle}</span>
            </span>
        </button>
    );
};

export default TVProgramItem;

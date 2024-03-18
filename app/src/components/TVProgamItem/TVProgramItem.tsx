import React, { useState } from 'react';
import { TVProgram } from '@app-types/TVProgram';
import './TVProgramItem.css';

export interface TVProgramItemProps {
    info: TVProgram;
    onClick: () => void;
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
    const [isPressed, setIsPressed] = useState<boolean>(false);
    const { info, onClick: onClickCallbackFn } = props;

    const programTitle = info.title || info.name;

    // Consider extract this to a utils...
    const releaseDate = info.releaseDate || info.firstAirDate;
    const formattedReleaseDate = new Date(releaseDate!).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const handleOnClickItem = (): void => {
        onClickCallbackFn();
    };

    const handleOnKeyDownItem = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        event.stopPropagation();
        if (event.key === 'Enter') {
            setIsPressed(true);
            onClickCallbackFn();
        }
    };

    return (
        <div
            className="carousel-item tv-program-item relative cursor-pointer"
            role="button"
            onClick={handleOnClickItem}
            onKeyDown={handleOnKeyDownItem}
            aria-pressed={isPressed}
            data-testid={`program_${programTitle}`}
            data-element="tv-program-rail-item"
            data-cy="tv-program-rail-item"
        >
            <div tabIndex={0} className="bg-base-100 w-full h-full absolute opacity-0 tv-program-item__info text-sm text-left">
                <h4 className="block mb-1 text-base font-semibold">{programTitle}</h4>
                <Rating value={info?.rating!} className="mb-1 text-xs" />
                <span className="block mb-5">{formattedReleaseDate}</span>
                <p className="text-ellipsis overflow-hidden max-h-40 description">{info.description}</p>
            </div>
            <img src={info.images?.w185} className="rounded-md" alt={`${programTitle} poster`} aria-label={`${programTitle} poster`} />
        </div>
    );
};

export default TVProgramItem;

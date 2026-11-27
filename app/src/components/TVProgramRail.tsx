import React from 'react';
import { useNavigate } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { TVProgram, TVProgramType } from '@app-types/TVProgram';
import TVProgramItem from './TVProgamItem/TVProgramItem';
import { NotFound } from '@pages';
import './TVProgramRail.css';

const RAIL_OPTIONS = {
    align: 'start' as const,
    containScroll: false as const,
    duration: 32,
    loop: true,
    watchFocus: false,
    breakpoints: {
        '(prefers-reduced-motion: reduce)': { duration: 0 },
    },
};

export interface TVProgramRailProps {
    title: string;
    tvPrograms: TVProgram[];
    tvProgramType: TVProgramType;
    isLoading?: boolean;
    hasError?: boolean;
}

const TVProgramRail: React.FC<TVProgramRailProps> = (props: TVProgramRailProps): React.ReactElement => {
    const { title, tvPrograms, tvProgramType, isLoading = false, hasError = false } = props;
    const navigate = useNavigate();
    const [viewportRef, emblaApi] = useEmblaCarousel(RAIL_OPTIONS);

    const detailPath: Record<TVProgramType, string> = {
        movie: 'movies',
        'tv-show': 'tv-shows',
    };

    const Skeleton = <div className="program-rail__skeleton skeleton" data-testid="skeleton" data-cy="skeleton"></div>;
    const TVPrograms = tvPrograms.map(({ id, ...tvProgram }, index) => (
        <TVProgramItem
            key={id}
            info={tvProgram}
            onClick={() => navigate(`/${detailPath[tvProgramType]}/${id}`)}
            onFocus={() => emblaApi?.scrollTo(index)}
        />
    ));

    return (
        <section
            id={tvProgramType === 'movie' ? 'movies' : 'tv-shows'}
            className="program-rail"
            data-element="tv-program-rail"
            data-cy="tv-program-rail"
            aria-label={title}
        >
            <h2 className="program-rail__heading">{title}</h2>
            {hasError && <p role="alert">Could not load {title.toLowerCase()}. Reload the page to try again.</p>}
            {!hasError && tvPrograms.length === 0 && !isLoading && <NotFound title="Ups, nothing here..." />}
            <div className="program-rail__viewport" ref={viewportRef}>
                <div className="program-rail__track">{isLoading ? Skeleton : TVPrograms}</div>
            </div>
        </section>
    );
};
export default TVProgramRail;

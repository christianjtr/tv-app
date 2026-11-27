import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TVProgram, TVProgramType } from '@app-types/TVProgram';
import TVProgramItem from './TVProgamItem/TVProgramItem';
import { NotFound } from '@pages';

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

    const detailPath: Record<TVProgramType, string> = {
        movie: 'movies',
        'tv-show': 'tv-shows',
    };

    const Skeleton = <div className="skeleton w-full h-80" data-testid="skeleton" data-cy="skeleton"></div>;
    const TVPrograms = tvPrograms.map(({ id, ...tvProgram }) => (
        <TVProgramItem key={id} info={tvProgram} onClick={() => navigate(`/${detailPath[tvProgramType]}/${id}`)} />
    ));

    return (
        <div className="my-1" data-element="tv-program-rail" data-cy="tv-program-rail">
            <h2 className="divider divider-start text-lg">{title}</h2>
            {hasError && <p role="alert">Could not load {title.toLowerCase()}. Reload the page to try again.</p>}
            {!hasError && tvPrograms.length === 0 && !isLoading && <NotFound title="Ups, nothing here..." />}
            <div className="carousel w-full p-4 space-x-4 rounded-box">{isLoading ? Skeleton : TVPrograms}</div>
        </div>
    );
};
export default TVProgramRail;

import React from 'react';
import { useHistory } from 'react-router-dom';
import { TVProgram, TVProgramType } from '@app-types/TVProgram';
import TVProgramItem from './TVProgamItem/TVProgramItem';
import { NotFound } from '@pages';

export interface TVProgramRailProps {
    title: string;
    tvPrograms: TVProgram[];
    tvProgramType: TVProgramType;
    isLoading?: boolean;
}

const TVProgramRail: React.FC<TVProgramRailProps> = (props: TVProgramRailProps): React.ReactElement => {
    const { title, tvPrograms, tvProgramType, isLoading = false } = props;
    const history = useHistory();

    const detailPath: Record<TVProgramType, string> = {
        movie: 'movies',
        'tv-show': 'tv-shows',
    };

    const Skeleton = <div className="skeleton w-full h-80"></div>;
    const TVPrograms = tvPrograms.map(({ id, ...tvProgram }) => (
        <TVProgramItem key={id} info={tvProgram} onClick={() => history.push(`/${detailPath[tvProgramType]}/${id}`)} />
    ));

    return (
        <div className="my-1" data-element="tv-program-rail">
            <h2 className="divider divider-start text-lg">{title}</h2>
            {tvPrograms.length === 0 && <NotFound title="Ups, nothing here..." />}
            <div className="carousel w-full p-4 space-x-4 rounded-box">{isLoading ? Skeleton : TVPrograms}</div>
        </div>
    );
};
export default TVProgramRail;

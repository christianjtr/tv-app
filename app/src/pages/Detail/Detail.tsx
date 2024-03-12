import React from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { AllowedTVProgramResource } from '@app-types/TVProgram';
import { useFetchTVProgram } from '@hooks/useFetchTVProgram';
import { useBasePathCheckerForDetailedPage } from '@hooks/useSearchQueryParams';
import { Rating } from '@components/TVProgamItem/TVProgramItem';
import SeasonCard from '@components/SeasonCard';
import { Loading } from '@layout';
import ClockIcon from '@assets/clock.svg';
import IMDb from '@assets/imdb.svg';
import './Detail.css';

const Detail: React.FC = (): React.ReactElement => {
    const history = useHistory();
    const { pathname } = useLocation();
    const { id } = useParams<{ id: string }>();
    const basePath = useBasePathCheckerForDetailedPage(pathname);
    const { tvProgram, isLoading } = useFetchTVProgram(id, basePath as AllowedTVProgramResource);

    const title = tvProgram?.title || tvProgram?.name;
    const releaseDate = tvProgram?.releaseDate || tvProgram?.firstAirDate;
    const formattedReleaseDate = new Date(releaseDate!).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const isTVShow = tvProgram?.numberOfEpisodes && tvProgram?.numberOfSeasons;

    if (isLoading) return <Loading />;

    return (
        <>
            <div
                className="hero min-h-max text-left detail-container__wrapper bg-transparent"
                style={{ '--background-image': `url(${tvProgram?.images?.original})` } as React.CSSProperties}
            >
                <button
                    id="btn_back"
                    name="btn_back"
                    data-testid="btn_back"
                    onClick={() => history.goBack()}
                    className="btn btn-ghost absolute top-5 left-0"
                    aria-label="Back button"
                >
                    <svg className="h-6 w-6 fill-current md:h-8 md:w-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
                    </svg>
                    Return
                </button>
                <div className="hero-content flex-col lg:flex-row mt-16">
                    <img
                        src={tvProgram?.images?.w300}
                        className="max-w-sm rounded-lg shadow-2xl"
                        alt={`${title} poster`}
                        aria-label={`${title} poster`}
                    />
                    <div className="ml-3 text-white">
                        <h6 className="text-sm mb-1">{tvProgram?.tagLine}</h6>
                        <h1 className="text-5xl font-semibold">{title}</h1>
                        <div className="my-3">
                            <div className="my-3 flex align-baseline">
                                <Rating value={tvProgram?.rating as number} className="text-base p-3 border-none" />
                                {!isTVShow && (
                                    <>
                                        <img src={ClockIcon} className="inline-block mx-2" alt="Clock icon" aria-label="Clock image" width="16" />
                                        <span>{tvProgram?.runtime} min.</span>
                                    </>
                                )}
                                <a
                                    id="official_site"
                                    data-testid="official_site"
                                    href={tvProgram?.homepage}
                                    className="link link-hover mx-2"
                                    target="_blank"
                                    title="Official site"
                                    rel="noreferrer"
                                    aria-label="TV program official site"
                                >
                                    Official site ➜
                                </a>
                            </div>
                            <p className="my-2">
                                {!isTVShow && (
                                    <a
                                        id="imdb_link"
                                        data-testid="imdb_link"
                                        className="link link-hover inline-block"
                                        href={`"https://www.imdb.com/title/${tvProgram?.IMDBId}"`}
                                        rel="noreferrer"
                                        target="_blank"
                                        title="IMDb Official site"
                                        aria-label="IMDb official site"
                                    >
                                        <img src={IMDb} className="inline-block mr-2" alt="IMDb icon" aria-label="IMDb image" width="45" />
                                    </a>
                                )}
                                <span className="inline-block">{formattedReleaseDate}</span>
                                {isTVShow && (
                                    <>
                                        <span className="mx-2">|</span>
                                        <span className="inline-block">
                                            Duration: {tvProgram?.numberOfSeasons} Seasons, {tvProgram?.numberOfEpisodes} Episodes
                                        </span>
                                        <span className="mx-2">|</span>
                                        <span className="inline-block">Ended: {tvProgram?.inProduction ? 'In production' : 'Yes'}</span>
                                    </>
                                )}
                            </p>
                        </div>
                        <p className="my-6">
                            {tvProgram?.genres?.map(({ id, name }, index) => (
                                <span
                                    className="badge badge-secondary mr-2 rounded-xl bg-pink-500 text-white p-3 border-none"
                                    key={`genre_${index}_${id}`}
                                >
                                    {name}
                                </span>
                            ))}
                        </p>
                        <p className="my-6">{tvProgram?.description}</p>
                    </div>
                </div>
            </div>
            {isTVShow && (
                <>
                    <div className="text-2xl divider divider-start mb-10">Seasons</div>
                    <div className="grid md:grid-cols-5 gap-5 mb-10 sm:grid-cols-1 xs:grid-cols-1">
                        {tvProgram?.seasons?.map((season, index) => <SeasonCard info={season} key={`season_${id}_${index}`} />)}
                    </div>
                </>
            )}
        </>
    );
};

export default Detail;

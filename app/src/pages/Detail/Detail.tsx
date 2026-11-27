import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { AllowedTVProgramResource } from '@app-types/TVProgram';
import { useFetchTVProgram } from '@hooks/useFetchTVProgram';
import { useBasePathCheckerForDetailedPage } from '@hooks/useSearchQueryParams';
import { Rating } from '@components/TVProgamItem/TVProgramItem';
import EpisodeRatingGrid from './EpisodeRatingGrid';
import { Loading } from '@layout';
import formatReleaseDate from '../../utils/formatReleaseDate';
import ClockIcon from '@assets/clock.svg';
import IMDb from '@assets/imdb.svg';
import './Detail.css';

const Detail: React.FC = (): React.ReactElement => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { id = '' } = useParams<{ id: string }>();
    const basePath = useBasePathCheckerForDetailedPage(pathname);
    const { tvProgram, isLoading, hasError } = useFetchTVProgram(id, basePath as AllowedTVProgramResource);

    const title = tvProgram?.title || tvProgram?.name;
    const releaseDate = tvProgram?.releaseDate || tvProgram?.firstAirDate;
    const formattedReleaseDate = releaseDate ? formatReleaseDate(releaseDate) : '';

    const isTVShow = basePath === 'tv-shows';

    if (isLoading) return <Loading />;
    if (hasError) return <p role="alert">Could not load this title. Reload the page to try again.</p>;

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
                    onClick={() => navigate(-1)}
                    className="btn btn-ghost detail-back absolute top-5 left-0"
                >
                    <svg className="h-6 w-6 fill-current md:h-8 md:w-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
                    </svg>
                    Return
                </button>
                <div className="hero-content detail-content flex-col lg:flex-row mt-16">
                    <img src={tvProgram?.images?.w500} className="detail-poster" alt={`${title} poster`} />
                    <div className="detail-copy">
                        {tvProgram?.tagLine && <p className="detail-tagline">{tvProgram.tagLine}</p>}
                        <h1 className="detail-title">{title}</h1>
                        <div className="detail-meta">
                            <div className="detail-meta__group">
                                <Rating value={tvProgram?.rating as number} className="text-base p-3 border-none" />
                                {!isTVShow && (
                                    <>
                                        <img src={ClockIcon} className="inline-block" alt="" width="16" />
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
                                    Official site
                                </a>
                            </div>
                            <div className="detail-meta__group">
                                {!isTVShow && (
                                    <a
                                        id="imdb_link"
                                        data-testid="imdb_link"
                                        className="link link-hover inline-block"
                                        href={`https://www.imdb.com/title/${tvProgram?.IMDBId}`}
                                        rel="noreferrer"
                                        target="_blank"
                                        title="IMDb Official site"
                                        aria-label="IMDb official site"
                                    >
                                        <img src={IMDb} className="inline-block" alt="IMDb" width="45" />
                                    </a>
                                )}
                                <span className="inline-block">{formattedReleaseDate}</span>
                                {isTVShow && (
                                    <>
                                        <span>{tvProgram?.numberOfSeasons} seasons</span>
                                        <span>{tvProgram?.numberOfEpisodes} episodes</span>
                                        <span>{tvProgram?.inProduction ? 'In production' : 'Ended'}</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="detail-genres">
                            {tvProgram?.genres?.map(({ id, name }, index) => (
                                <span className="badge badge-secondary" key={`genre_${index}_${id}`}>
                                    {name}
                                </span>
                            ))}
                        </div>
                        <p className="detail-description">{tvProgram?.description}</p>
                    </div>
                </div>
            </div>
            {isTVShow && tvProgram?.id && <EpisodeRatingGrid key={id} showId={tvProgram.id} seasons={tvProgram.seasons} />}
        </>
    );
};

export default Detail;

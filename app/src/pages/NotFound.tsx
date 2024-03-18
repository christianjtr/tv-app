import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundStateImage from '@assets/not_found.svg';

export interface NotFoundProps {
    title?: string;
    showBackToHome?: boolean;
}

const NotFound: React.FC<NotFoundProps> = (props: NotFoundProps): React.ReactElement => {
    const { title, showBackToHome = false } = props;

    const titleToDisplay = title || 'The section does not exist';

    return (
        <div className="hero h-full flex flex-col mt-5" data-testid="not-found-component">
            <img src={NotFoundStateImage} alt="Not found state image" aria-label="Not found state image" width="400" />
            <h1 className="text-xl my-10">{titleToDisplay}</h1>
            {showBackToHome && (
                <Link to="/" title="Return to home" className="btn btn-neutral">
                    Return to home
                </Link>
            )}
        </div>
    );
};

export default NotFound;

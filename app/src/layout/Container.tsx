import React, { MutableRefObject } from 'react';
import useArrowNavigation from '@hooks/useArrowNavigation';

export interface ContainerInterface {
    children: string | JSX.Element | JSX.Element[];
}

const Container: React.FC<ContainerInterface> = ({ children }: ContainerInterface): React.ReactElement => {
    const ref = useArrowNavigation('[tabindex], button, a, input') as MutableRefObject<HTMLDivElement>;

    return (
        <div ref={ref} className="hero min-h-screen bg-base-100 text-center text-neutral-content flex items-start justify-center">
            <div className="px-4 container md:max-w-6xl">{children}</div>
        </div>
    );
};

export default Container;

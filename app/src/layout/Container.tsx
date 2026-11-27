import React from 'react';

export interface ContainerInterface {
    children: React.ReactNode;
}

const Container: React.FC<ContainerInterface> = ({ children }: ContainerInterface): React.ReactElement => {
    return (
        <div className="hero min-h-screen bg-base-100 text-center text-neutral-content flex items-start justify-center">
            <div className="px-4 container md:max-w-6xl">{children}</div>
        </div>
    );
};

export default Container;

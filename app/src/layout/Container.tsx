import React from 'react';

export interface ContainerInterface {
    children: React.ReactNode;
}

const Container: React.FC<ContainerInterface> = ({ children }: ContainerInterface): React.ReactElement => {
    return (
        <div className="min-h-screen bg-[#08090d] text-white">
            <div className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">{children}</div>
        </div>
    );
};

export default Container;
